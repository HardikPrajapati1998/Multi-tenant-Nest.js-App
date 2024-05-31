// auth-service/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
    const user = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(user);
      
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }
}
