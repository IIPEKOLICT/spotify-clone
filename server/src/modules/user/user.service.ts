import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
