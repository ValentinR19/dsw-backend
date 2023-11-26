import { mockUpdateUsuarioDTO, mockUsuarioRepository } from './../mocks/usuario.mock';
import { ClienteService } from '@cliente-module/services/clientes.service';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioNotFoundException } from '@usuario-module/exceptions/usuario-not-found.exception';
import { UsuarioNotSavedException } from '@usuario-module/exceptions/usuario-not-saved.exception';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioRepository } from '@usuario-module/repositories/usuario.repository';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { mockCreateUsuarioDTO, mockUsuario } from '@usuario-module/tests/mocks/usuario.mock';
import { DeepPartial } from 'typeorm';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: UsuarioRepository;
  let clienteService: ClienteService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
        {
          provide: ClienteService,
          useValue: { create: jest.fn() },
        },
      ],
    })
      .setLogger(Logger)
      .compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
    clienteService = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
    expect(clienteService).toBeDefined();
  });

  describe(`findBy`, () => {
    it(`Debería traer un array de usuarios `, async () => {
      const filters: DeepPartial<Usuario> = mockUsuario();

      const usuario = mockUsuario();
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(usuario);
      const response = await service.findBy(filters);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toBeDefined();
      expect(response.documento).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.firstName).toBeDefined();
      expect(response.lastName).toBeDefined();
      expect(repository.findBy).toBeCalledWith(filters);
    });

    it(`Debería lanzar un error de tipo UsuarioNotFoundException`, async () => {
      const filters: DeepPartial<Usuario> = mockUsuario();

      jest.spyOn(repository, 'findBy').mockRejectedValueOnce(new Error());
      await expect(service.findBy(filters)).rejects.toThrowError(UsuarioNotFoundException);
      expect(repository.findBy).toBeCalledWith(filters);
    });
  });

  describe(`create`, () => {
    it('Debería devolver una instancia de usuario si no ocurre ningun error', async () => {
      const dto = mockUsuario();

      jest.spyOn(clienteService, 'create');
      jest.spyOn(repository, 'create').mockResolvedValueOnce(dto);
      const response = await service.create(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toBeDefined();
      expect(response.documento).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.firstName).toBeDefined();
      expect(response.lastName).toBeDefined();
      expect(repository.create).toBeCalledWith(dto);
      expect(clienteService.create).toBeCalled();
    });

    it(`Debería lanzar un error generico`, async () => {
      const dto = mockCreateUsuarioDTO();

      jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error('test-error'));

      await expect(service.create(dto)).rejects.toThrowError(UsuarioNotSavedException);
      expect(repository.create).toBeCalledWith(dto);
    });
  });

  describe(`softDelete`, () => {
    it(`Debería hacer un softDelete un usuario si se le provee el username`, async () => {
      const username = faker.string.alpha();
      await expect(service.softDelete(username)).resolves.not.toThrowError();
      expect(repository.softDelete).toBeCalledWith(username);
    });

    it(`Deberia lanzar un error generico al intentar borrar el usuario`, async () => {
      const username = faker.string.alpha();

      jest.spyOn(repository, 'softDelete').mockRejectedValueOnce(new Error('test-error'));
      await expect(service.softDelete(username)).rejects.toThrowError(UsuarioNotSavedException);

      expect(repository.softDelete).toBeCalledWith(username);
    });
  });

  describe(`update`, () => {
    it(`Debería retornar un usuario editado`, async () => {
      const usuario = mockCreateUsuarioDTO();
      usuario.username = faker.string.alpha();

      jest.spyOn(service, 'findBy');
      jest.spyOn(repository, 'create').mockResolvedValueOnce(usuario);

      const response = await service.update(usuario.username, usuario);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toEqual(usuario.username);

      expect(repository.create).toBeCalledWith(usuario);
      expect(service.findBy).toBeCalledWith(usuario.username);
    });
  });
});
