import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterUserInput } from './dtos/register-user.input';
import { LoginUserInput } from './dtos/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  private comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async register(data: RegisterUserInput) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    // Hash password
    const hashedPassword = data.password
      ? this.hashPassword(data.password)
      : null;

    const registeredUser = await this.userService.register({
      ...data,
      password: hashedPassword,
    });

    const payload = {
      username: registeredUser.email,
      sub: registeredUser.id,
    };

    const jwt = this.jwtService.sign(payload);

    return { ...registeredUser, jwt } as UserEntity;
  }

  async login(data: LoginUserInput) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const payload = {
      username: user.email,
      sub: user.id,
    };

    const jwt = this.jwtService.sign(payload);

    return { ...user, jwt } as UserEntity;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    if (user && this.comparePassword(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }
}
