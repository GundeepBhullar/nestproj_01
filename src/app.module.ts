import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
//import { AuthModule } from './auth/auth.module';
import { User, } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entities/movie.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/like.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot ({
      type: `postgres`,
      host: `localhost`,
      port: 5432,
      password: `post@123`,
      username: `postgres`,
      entities: [User, Movie, Like],
      database: `datanew`,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }),
    MovieModule,
    LikeModule
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
