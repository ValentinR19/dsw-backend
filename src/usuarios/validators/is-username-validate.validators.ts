import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsUsernameAvailable', async: true })
@Injectable()
export class IsUsernameAvailableConstraint implements ValidatorConstraintInterface {
  private logger = new Logger(IsUsernameAvailableConstraint.name);
  constructor(private readonly userService: UsuarioService) {}

  async validate(username: string): Promise<boolean> {
    try {
      this.logger.log(`Verificando si el usuario ${username} esta disponible para registrarse`);
      await this.userService.findBy({ username });
      this.logger.error(`El usuario ${username} no esta disponible para registrarse`);
      return false;
    } catch (error) {
      this.logger.log(`El usuario ${username} esta disponible para registrarse`);
      return true;
    }
  }

  defaultMessage(): string {
    return `El nombre de usuario no esta disponible. Por favor escoja otro y vuelva a intentar`;
  }
}

export function IsUsernameAvailable(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAvailableConstraint,
    });
  };
}
