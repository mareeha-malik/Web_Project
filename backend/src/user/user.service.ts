import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Find a user by ID
  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Find a user by email
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email.toLowerCase().trim() } });
  }

  // Create a new user
  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
