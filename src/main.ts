import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  //penambahan cors untuk mengizinkan request dari luar (part Authentication)
  app.enableCors({
    origin : "*"
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true
    }))

  const config = new DocumentBuilder()
    .setTitle('Lab Backend Kelas C dan D ')
    .setDescription('Lab Backend')
    .setVersion('0.1')
    .addTag('kelas-C')
    .addBearerAuth()
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();