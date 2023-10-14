import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { IValidateUser } from '@auth-module/models/interfaces/validate-user.interface';
import { AuthService } from '@auth-module/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDTO): Promise<IValidateUser> {
    return this.authService.login(credentials);
  }
}
