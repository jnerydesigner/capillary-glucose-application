import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersService } from '@app/application/services/users.service';
import { CreateUserDto } from '@app/application/dto/create-user.dto';

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
