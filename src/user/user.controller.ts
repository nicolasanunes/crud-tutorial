import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ListUserDto } from './dto/list-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);

    return {
      user: new ListUserDto(createdUser.id, createdUser.name),
      message: 'Usuário criado!',
    };
  }

  @Get()
  async listAllUsers() {
    const savedUsers = await this.userService.listAllUsers();

    return savedUsers;
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    const savedUserById = await this.userService.findUserById(id);

    return savedUserById;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);

    return {
      user: new ListUserDto(updatedUser.id, updatedUser.name),
      message: 'Usuário atualizado!',
    };
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    await this.userService.removeUser(id);

    return {
      message: 'Usuário removido!',
    };
  }
}
