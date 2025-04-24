import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from '../application/dto/create-user.dto';
import { UsersService } from '@app/application/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get('/:userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(parseInt(userId));
  }
}
