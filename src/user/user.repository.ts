import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async saveUser(user: UserEntity) {
    this.users.push(user);
  }

  async listAllUsers() {
    return this.users;
  }
}
