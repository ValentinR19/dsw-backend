import { InvalidCredentialsException } from '@auth-module/exceptions/invalid-credentials.exception';
import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { IAccessToken } from '@auth-module/models/interfaces/access-token.interface';
import { IPayload } from '@auth-module/models/interfaces/validate-user.interface';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
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

    const user = await this.validateCredentials(credentials);
    const payload: IPayload = {
      id: user.id,
      username: user.username,
      iss: process.env.ORIGIN,
    };
    return this.signToken(payload);
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
