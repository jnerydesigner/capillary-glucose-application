import { CreateUserDto } from '../dto/create-user.dto';
import { RawUserSimple } from '../mappers/users.mapper';

export interface UsersRepositoryInterface {
  findOne(userId: number): Promise<any>;
  findOneEmail(email: string): Promise<boolean>;
  createUser(user: CreateUserDto): Promise<RawUserSimple>;
}
