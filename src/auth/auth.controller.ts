import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserInput } from './dto/login-input.dto';
import { User } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<User> {
    createAuthDto.email = createAuthDto.email.toLowerCase();
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  async login(@Body() data: LoginUserInput) {
    data.email = data.email.toLowerCase();
    const { email, password } = data;
    const user = await this.authService.validateUser(
      email.toLowerCase(),
      password,
    );
    const { id, name } = user;
    const token = await this.authService.generateAuthTokenFromLogin({
      userId: id,
      email,
    });

    return { id, name, email, ...token };
  }
}
