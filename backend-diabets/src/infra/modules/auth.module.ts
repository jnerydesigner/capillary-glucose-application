import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@app/infra/modules/users.module';
import { AuthController } from '@app/presenters/auth.controller';

import { AuthService } from '@app/application/services/auth.service';
import { jwtConstants } from '../constants/constant';
import { GoogleStrategy } from '../auth/strategies/google-oauth.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from '../auth/config/google.oauth.config';

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
