import { DataSource } from 'typeorm';
import { User } from '../entities/userEntity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'learn',
  entities: [User],
  synchronize: true,
});
