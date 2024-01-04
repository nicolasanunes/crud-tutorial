import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

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
      user: createdUser.name,
      message: 'Usuário criado!',
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
