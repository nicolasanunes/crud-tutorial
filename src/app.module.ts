import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/db.config';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {}
