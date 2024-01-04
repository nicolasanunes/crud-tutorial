import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ListUserDto } from './dto/list-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userEntity = new UserEntity();

    Object.assign(userEntity, createUserDto as UserEntity);

    return this.userRepository.save(userEntity);
  }

  async listAllUsers() {
    const savedUsers = await this.userRepository.find();

    const listAllUsers = savedUsers.map(
      (user) => new ListUserDto(user.id, user.name),
    );

    return listAllUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
