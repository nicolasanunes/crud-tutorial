import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  name: string;
}
