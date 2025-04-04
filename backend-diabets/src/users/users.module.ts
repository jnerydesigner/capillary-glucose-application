import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '@app/database/prisma.service';
import { UsersRepository } from './repository/users-prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useFactory: (prisma: PrismaService) => {
        return new UsersRepository(prisma);
      },
      inject: [PrismaService],
    },
  ],
})
export class UsersModule {}
