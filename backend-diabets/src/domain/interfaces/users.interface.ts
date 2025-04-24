import { User } from '@prisma/client';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { RawUserSimple } from '@app/users/mappers/users.mapper';

export interface UsersRepositoryInterface {
  findOne(userId: number): Promise<any>;
  findOneEmail(email: string): Promise<boolean>;
  findOneEmailLogin(email: string): Promise<User>;
  createUser(user: CreateUserDto): Promise<RawUserSimple>;
}
