import { SignInDto } from '@app/application/dto/sign-in.dto';
import { AuthService } from '@app/application/services/auth.service';
import { Public } from '@app/infra/decorator/is_public.decorator';
import { AuthGuard } from '@app/infra/guards/auth.guard';
import { GoogleAuthGuard } from '@app/infra/guards/google-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    console.log('login');
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req, @Res() res) {
    console.log(req.user);

    res.redirect(`${this.configService.get('FRONT_URL')}?token=${req.user}`);
  }
}
