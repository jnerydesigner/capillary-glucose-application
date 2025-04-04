import { Logger } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { UsersRepositoryInterface } from '../interfaces/users.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { RawUserSimple, UsersMapper } from '../mappers/users.mapper';

export class UsersRepository implements UsersRepositoryInterface {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(UsersRepository.name);
  }

  async findOne(userId: number): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        capillary_blood_glucose: true,
      },
    });

    return user;
  }

  async findOneEmail(email: string): Promise<boolean> {
    const findEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    this.logger.log(JSON.stringify(findEmail));

    if (findEmail) {
      return false;
    }

    return true;
  }

  async createUser(user: CreateUserDto): Promise<RawUserSimple> {
    const response = (await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    })) as RawUserSimple;

    return UsersMapper.toUserResponse(response);
  }
}
