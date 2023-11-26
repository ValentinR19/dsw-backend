import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { faker } from '@faker-js/faker';
import { CreateUsuarioDTO } from '@usuario-module/models/dtos/create-usuario.dto';
import { UpdateUsuarioDTO } from '@usuario-module/models/dtos/update-usuario.dto';
import { DeepPartial } from 'typeorm';

export function mockUsuario(): Usuario {
  const usuario = new Usuario(faker.string.alpha(), faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.alpha());
  usuario.username = faker.string.alpha();
  return usuario;
}

export function mockUsuarioArray(): Usuario[] {
  return [mockUsuario(), mockUsuario()];
}
export const mockUsuarioService = {
  findBy: jest.fn().mockImplementation(async (filters: DeepPartial<Usuario>): Promise<Usuario> => {
    const usuario = mockUsuario();
    filters?.username && (usuario.username = filters.username);
    filters?.firstName && (usuario.firstName = filters.firstName);
    filters?.lastName && (usuario.lastName = filters.lastName);
    return usuario;
  }),
  create: jest.fn().mockImplementation(async (usuario: CreateUsuarioDTO): Promise<Usuario> => {
    const savedUser = mockCreateUsuarioDTO();
    savedUser.username = usuario.username || faker.string.alpha();
    savedUser.password = usuario.password || faker.string.alpha();
    savedUser.documento = usuario.documento || faker.string.alpha();
    savedUser.firstName = usuario.firstName || faker.string.alpha();
    savedUser.lastName = usuario.lastName || faker.string.alpha();
    savedUser.email = usuario.email || faker.string.alpha();
    return savedUser;
  }),
  update: jest.fn().mockImplementation(async (username: string, usuario: Usuario): Promise<Usuario> => {
    const savedUser = new Usuario(usuario.password, usuario.firstName, usuario.lastName, usuario.email, usuario.documento);
    savedUser.username = username;
    return savedUser;
  }),
  softDelete: jest.fn().mockReturnThis(),
};

export const mockUsuarioRepository = {
  findByUsername: jest.fn().mockImplementation(async (username: string): Promise<Usuario> => {
    const usuario = mockUsuario();
    usuario.username = username;
    return usuario;
  }),
  findBy: jest.fn().mockResolvedValue(mockUsuario()),
  create: jest.fn().mockImplementation(async (usuario: Usuario): Promise<Usuario> => {
    const savedUser = mockUsuario();
    savedUser.username = usuario.username;
    savedUser.password = usuario.password || faker.string.alpha();
    savedUser.firstName = usuario.firstName || faker.string.alpha();
    savedUser.lastName = usuario.lastName || faker.string.alpha();
    savedUser.email = usuario.email || faker.internet.email();
    savedUser.documento = usuario.documento || faker.string.alpha();
    return usuario;
  }),
  softDelete: jest.fn().mockReturnThis(),
};

export const mockUsuarioInternalRepository = {
  findOneOrFail: jest.fn().mockResolvedValue(mockUsuario()),
  save: jest.fn().mockResolvedValue(mockUsuario()),
  softDelete: jest.fn().mockReturnThis(),
};

export function mockCreateUsuarioDTO() {
  const usuario = new CreateUsuarioDTO(faker.string.alpha(), faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.string.alpha());
  usuario.username = faker.string.alpha();
  return usuario;
}

export function mockUpdateUsuarioDTO(): UpdateUsuarioDTO {
  const usuario = new UpdateUsuarioDTO();
  usuario.username = faker.string.alpha();
  usuario.password = faker.string.alpha();
  usuario.documento = faker.string.alpha();
  usuario.firstName = faker.string.alpha();
  usuario.lastName = faker.string.alpha();
  usuario.email = faker.string.alpha();
  delete usuario.username;
  delete usuario.documento;
  return usuario;
}
