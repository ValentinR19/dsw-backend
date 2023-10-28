import { InvalidCredentialsException } from '@auth-module/exceptions/invalid-credentials.exception';
import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { IAccessToken } from '@auth-module/models/interfaces/access-token.interface';
import { IValidateLogin } from '@auth-module/models/interfaces/validate-login.interface';
import { IPayload } from '@auth-module/models/interfaces/validate-user.interface';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioNotFoundException } from '@usuario-module/exceptions/usuario-not-found.exception';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDTO): Promise<IAccessToken> {
    this.logger.log(`Intentando iniciar sesion para el usuario ${credentials.username}`);

    const userValidate = await this.validateCredentials(credentials);
    if (userValidate.username) {
      const payload: IPayload = {
        username: userValidate.username,
        iss: process.env.ORIGIN,
      };
      return this.signToken(payload);
    } else {
      return userValidate;
    }
  }

  private async validateCredentials(credentials: LoginDTO): Promise<any> {
    try {
      const user = await this.userService.findBy({ username: credentials.username });
      if (user) {
        this.logger.log(`Usuario ${user.username.toUpperCase()} encontrado. Se procede a validar su password`);

        const isRightPassword = await compare(credentials.password, user.password);

        if (isRightPassword) {
          this.logger.log(`La password del usuario ${user.username.toUpperCase()} es correcta, se retorna el objeto usuario`);
          return user;
        } else {
          const validateLogin: IValidateLogin = {
            validate: false,
            message: 'password incorrecta',
          };
          return validateLogin;
        }
      }
    } catch (error) {
      if (error instanceof UsuarioNotFoundException) {
        const validateLogin: IValidateLogin = {
          validate: false,
          message: 'username no encontrado en la base de datos',
        };
        return validateLogin;
      }
    }
  }

  private async signToken(payload: IPayload): Promise<IAccessToken> {
    this.logger.log(`Se procede a firmar el token JWT para el usuario ${payload.username}`);
    this.logger.log(`Tiempo de expiracion del token para el usuario ${payload.username}: ${process.env.TOKEN_EXPIRATION}`);

    const signedToken: IAccessToken = {
      token: this.jwtService.sign(payload, { expiresIn: process.env.TOKEN_EXPIRATION }),
    };

    this.logger.log(`Token JWT firmado con exito para el usuario ${payload.username}`);
    return signedToken;
  }
}
