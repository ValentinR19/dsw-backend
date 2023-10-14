import { InvalidCredentialsException } from '@auth-module/exceptions/invalid-credentials.exception';
import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { IValidateUser } from '@auth-module/models/interfaces/validate-user.interface';
import { Injectable, Logger } from '@nestjs/common';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UsuarioService) {}

  async login(credentials: LoginDTO): Promise<IValidateUser> {
    this.logger.log(`Intentando iniciar sesion para el usuario ${credentials.username}`);

    const user = await this.validateCredentials(credentials);
    const validateUser: IValidateUser = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      esValido: true,
      mensaje: 'El usuario es correcto.',
    };
    return validateUser;
  }

  private async validateCredentials(credentials: LoginDTO): Promise<Usuario> {
    try {
      const user = await this.userService.findBy({ username: credentials.username });
      this.logger.log(`Usuario ${user.username.toUpperCase()} encontrado. Se procede a validar su password`);

      const isRightPassword = await compare(credentials.password, user.password);

      if (isRightPassword) {
        this.logger.log(`La password del usuario ${user.username.toUpperCase()} es correcta, se retorna el objeto usuario`);
        return user;
      }

      throw new Error();
    } catch (error) {
      throw new InvalidCredentialsException(credentials.username);
    }
  }
}
