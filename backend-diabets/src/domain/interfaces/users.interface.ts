import { User } from '@prisma/client';

import { RawUserSimple } from '@app/domain/mappers/users.mapper';
import { CreateUserDto } from '@app/application/dto/create-user.dto';

export interface UsersRepositoryInterface {
  findOne(userId: number): Promise<any>;
  findOneEmail(email: string): Promise<boolean>;
  findOneEmailLogin(email: string): Promise<User>;
  createUser(user: CreateUserDto): Promise<RawUserSimple>;
}
