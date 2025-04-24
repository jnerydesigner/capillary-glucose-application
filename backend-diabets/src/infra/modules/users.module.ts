import { Module } from '@nestjs/common';

import { PrismaService } from '@app/infra/database/prisma.service';
import { UsersController } from '@app/presenters/users.controller';
import { UsersService } from '@app/application/services/users.service';
import { UsersRepository } from '@app/infra/database/repository/users-prisma.repository';

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
  exports: [UsersService],
})
export class UsersModule {}
