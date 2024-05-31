// auth-service/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServiceService } from './auth-service.service';
import { AuthServiceController } from './auth-service.controller';
import { DatabaseModule } from '../../multi-tenant-app/src/database/database.module';
import { User } from './auth/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
