import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,new ExpressAdapter());
  const PORT =5000; 
  app.enableCors()
  await app.listen(PORT, () => {
    console.log(`running in PORT ${PORT}`)
  });
}
bootstrap();
