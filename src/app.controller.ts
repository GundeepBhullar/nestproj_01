import { BadRequestException, Body, Controller, Get, Post, Render, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'module';
import path from 'path';
import { User } from './user/entities/user.entity';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { Response, Request, response } from 'express';



@Controller('api')
export class AppController {
  @Get()
  @Render('index')
  getMovies() {
    const movies = [];
    return {movies};
  }
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
  ) {}


  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
     const hashedPassword = await bcrypt.hash(password, 12);
     
     const user = await this.appService.create({
      name,
      email,
      password: hashedPassword
     })
     
     delete user.password;
     const {username,age,gender, ...result} = user;

     return result ;
  }

  @Post('login')
  async login (
    @Body('email')email: string,
    @Body('password')password: string,
    @Res({passthrough: true}) response: Response
  )  {
    console.log('Login request recieved:', { email, password} );

    if(!email || !password) {
      throw new BadRequestException('Email and password must be provided');
    }
    const user = await this.appService.findOne({email})
    
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if(!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({id: user.id});

    response.cookie('jwt', jwt, {httpOnly: true});

    return {
     message: 'Succes' };
  }


@Get('user')
async user(@Req() request: Request) {
  const cookie = request.cookies['jwt'];
  
  try {
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.appService.findOne({id: data['id']});
    
    const {password,username,age,gender, ...result} = user;
  
    return result;
  } catch (e) {
    throw new UnauthorizedException();
  }
  
}

@Post('logout')
async logout(@Res({passthrough: true}) response: Response) {
  response.clearCookie('jwt');

  return {
    message: 'Succesfully loged out and cookie cleared'
  }
}


}