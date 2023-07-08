import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dtos/register-user.input';
import { AuthEntity } from './entities/auth.entity';

import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginUserInput } from './dtos/login-user.input';
import { JwtAuthGuard, User, UserContext } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => AuthEntity)
  register(@Args('data') data: RegisterUserInput) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthEntity, { name: 'login' })
  login(@Args('data') data: LoginUserInput) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity, { name: 'profile' })
  profile(@UserContext() user: User) {
    return user;
  }
}
