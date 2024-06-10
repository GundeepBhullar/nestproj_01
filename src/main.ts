import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');
  
  app.use(cookieParser());
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   credentials: true
  // }
  // )


  await app.listen(8080);
}
bootstrap();
