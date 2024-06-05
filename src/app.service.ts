import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
     @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(data: any): Promise<User> {
     return this.userRepository.save(data);    
  }

  async findOne(condition: any): Promise<User> {
    if (!condition || Object.keys(condition).length === 0) {
      throw new Error('You must provide selection condition in order to find a single row.');
    }
    console.log('Searching for user with condition:', condition);
    return this.userRepository.findOne({
      // where:[{email:condition}]
      where: condition 
    });
  }
  
  }

