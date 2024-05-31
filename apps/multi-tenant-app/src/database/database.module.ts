// auth-service/src/database/database.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { User } from '../../../auth-service/src/auth/user.entity'; // Correct path to the User entity
import { TenantMiddleware } from '../../../multi-tenant-app/src/tenant/tenant.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (request: any) => {
        const tenantId = request.headers['x-tenant-id'];
        if (!tenantId) {
          throw new Error('Tenant ID is missing');
        }
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: `tenant_${tenantId}`,
          entities: [User], // Ensure the User entity is included
          synchronize: true,
          schema: `tenant_${tenantId}`, // If you are using different schemas for each tenant
        } as ConnectionOptions;
      },
      inject: [REQUEST],
    }),
    TypeOrmModule.forFeature([User]), // Include User entity in the current scope
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
