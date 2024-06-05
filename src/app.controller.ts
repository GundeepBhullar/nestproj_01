import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'module';
import path from 'path';
import { User } from './user/entities/user.entity';
import * as bcrypt from 'bcrypt'; 

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
     const hashedPassword = await bcrypt.hash(password, 12);
     
     return this.appService.create({
      name,
      email,
      password: hashedPassword
     });
  }

  @Post('login')
  async login (
    @Body('email')email: string,
    @Body('password')password: string
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
    return user;
  }
}
