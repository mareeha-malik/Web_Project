import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors( { origin: '*' });  // Enable CORS for all routes
  app.enableCors({ origin: 'http://localhost:3000' });
  await app.listen(8000);
}
bootstrap();
