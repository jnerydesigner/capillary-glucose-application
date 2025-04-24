import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@app/infra/modules/users.module';
import { AuthController } from '@app/presenters/auth.controller';

import { AuthService } from '@app/application/services/auth.service';
import { jwtConstants } from '../constants/constant';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
