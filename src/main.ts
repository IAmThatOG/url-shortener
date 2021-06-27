import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client/client.module';
import { HttpExceptionFilter } from './client/filters/http-exception.filter';
import { ValidationPipe } from './client/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
