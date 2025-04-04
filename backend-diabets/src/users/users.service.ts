/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryInterface } from './interfaces/users.interface';
import { UsersMapper } from './mappers/users.mapper';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);

    return UsersMapper.toResponse(user);
  }

  async createUser(user: CreateUserDto) {
    const findUser = await this.usersRepository.findOneEmail(user.email);

    if (!findUser) {
      throw new ConflictException('Usuário já existe');
    }

    return await this.usersRepository.createUser(user);
  }
}
