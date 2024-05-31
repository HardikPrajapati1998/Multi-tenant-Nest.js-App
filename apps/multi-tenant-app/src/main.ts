// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TenantMiddleware } from './tenant/tenant.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new TenantMiddleware().use);
  await app.listen(3000);
}
bootstrap();
