import { UserEntity } from 'src/user/user.entity';
import { DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/sql',
  synchronize: true, // Obs: use synchronize: true somente em desenvolvimento
  //entities: [__dirname + '/../*/.entity.{js,ts}'],
  entities: [UserEntity],
};
