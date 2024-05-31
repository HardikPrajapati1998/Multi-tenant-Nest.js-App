import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { TenantMiddleware } from '../../multi-tenant-app/src/tenant/tenant.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.use(new TenantMiddleware().use);
  await app.listen(3001); // AuthService running on port 3001
}
bootstrap();