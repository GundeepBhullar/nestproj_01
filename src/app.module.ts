import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
//import { AuthModule } from './auth/auth.module';
import { User, } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot ({
      type: `postgres`,
      host: `localhost`,
      port: 5432,
      password: `post@123`,
      username: `postgres`,
      entities: [User],
      database: `datanew`,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
