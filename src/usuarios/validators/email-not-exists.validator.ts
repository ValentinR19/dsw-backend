import { Injectable, Logger } from '@nestjs/common';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailNotExistsConstraint implements ValidatorConstraintInterface {
  private logger = new Logger(EmailNotExistsConstraint.name);

  constructor(private readonly usuarioService: UsuarioService) {}

  async validate(email: string): Promise<boolean> {
    try {
      this.logger.log(`Verificando si el email ${email} esta disponible para registrarse`);
      await this.usuarioService.findBy({ email });
      this.logger.error(`El email ${email} no esta disponible para registrarse`);
      return false;
    } catch (error) {
      this.logger.log(`El email ${email} esta disponible para registrarse`);
      return true;
    }
  }

  defaultMessage(): string {
    return `El email ya se encuentra registrado en el sistema. Por favor utilice otro`;
  }
}

export function EmailNotExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailNotExistsConstraint,
    });
  };
}
