// auth-service/src/auth/auth.controller.ts
import { Controller, Post, Body, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';

@Controller('auth-service')
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }, @Request() req): Promise<any> {
    const { username, password } = body;
    if (!req.headers['x-tenant-id']) {
      throw new HttpException('Tenant ID is missing', HttpStatus.BAD_REQUEST);
    }
    const user = await this.authService.register(username, password);
    return { message: 'User registered successfully123', userId: user };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Request() req): Promise<any> {
    const { username, password } = body;
    if (!req.headers['x-tenant-id']) {
      throw new HttpException('Tenant ID is missing', HttpStatus.BAD_REQUEST);
    }
    const isValid = await this.authService.login(username, password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { message: 'Login successful' };
  }
}
