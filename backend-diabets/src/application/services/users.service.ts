import { CreateUserDto } from '@app/application/dto/create-user.dto';
import { UsersRepositoryInterface } from '@app/domain/interfaces/users.interface';

import { UsersMapper } from '@app/users/mappers/users.mapper';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

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

  async findOneLogin(email: string) {
    return await this.usersRepository.findOneEmailLogin(email);
  }

  async createUser(user: CreateUserDto) {
    const findUser = await this.usersRepository.findOneEmail(user.email);

    if (!findUser) {
      throw new ConflictException('Usuário já existe');
    }

    return await this.usersRepository.createUser(user);
  }
}
