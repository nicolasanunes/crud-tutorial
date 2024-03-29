import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUserById(id: number) {
    const checkId = await this.userRepository.findOne({
      where: { id },
    });

    if (checkId === null)
      throw new NotFoundException('O id não foi encontrado!');

    return checkId;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (updatedUser === null)
      throw new NotFoundException('O usuário não foi encontrado!');

    Object.assign(updatedUser, updateUserDto as UserEntity);

    return this.userRepository.save(updatedUser);
  }

  async removeUser(id: number) {
    const removedUser = await this.userRepository.delete(id);

    if (!removedUser.affected) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }
  }
}
