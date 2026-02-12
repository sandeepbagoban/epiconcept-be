import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for your frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://epiconcept-fe.vercel.app', // production
    ],
    credentials: true, // needed if you use cookies or auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
