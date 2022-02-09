import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards
  } from '@nestjs/common';
import { component } from '@prisma/client';
import { UserService } from './user.service';

// import { JwtAuthGuard } from '../auth/auth.jwt.guard';


@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<component[]> {
    return this.userService.components();
  }
  // @UseGuards(JwtAuthGuard)
  // async getAll(): Promise<User[]> {
  //   return this.userService.users({});
  // }

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string; password: string },
  // ): Promise<User> {
  //   return this.userService.createUser(userData);
  // }
}
