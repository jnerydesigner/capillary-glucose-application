import { UsersService } from '@app/application/services/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserGoogleDTO } from '../dto/create-user-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneLogin(username);

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, username: user.email, avatar: user.avatar };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateGoogleUser(googleUser: CreateUserGoogleDTO) {
    const user = await this.usersService.findOneLogin(
      googleUser.emails[0].value,
    );

    if (!user || !googleUser.emails[0].verified) {
      throw new NotFoundException('User Not Found');
    }

    const payload = { sub: user.id, username: user.email, avatar: user.avatar };

    const access_token = await this.jwtService.signAsync(payload);

    console.log(access_token);

    return {
      access_token,
    };
  }
}
