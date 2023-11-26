import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioRepository } from '@usuario-module/repositories/usuario.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepPartial, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCreateUsuarioDTO, mockUsuario, mockUsuarioInternalRepository } from '@usuario-module/tests/mocks/usuario.mock';
import { faker } from '@faker-js/faker';
import { mockQueryBuilder } from '@shared-module/tests/typeorm.mock';
import { Logger } from '@nestjs/common';

describe('UsuarioRepository', () => {
  let repository: UsuarioRepository;
  let internalRepository: Repository<Usuario>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioRepository, { provide: getRepositoryToken(Usuario), useValue: mockUsuarioInternalRepository }],
    })
      .setLogger(Logger)
      .compile();
    repository = module.get<UsuarioRepository>(UsuarioRepository);
    internalRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('Deberia estar definido', () => {
    expect(repository).toBeDefined();
    expect(internalRepository).toBeDefined();
  });

  describe('findByUsername', () => {
    it('Debería devolver un objeto de tipo Usuario si le paso un username', async () => {
      const usuario = mockUsuario();
      const username = faker.string.alpha();
      usuario.username = username;

      jest.spyOn(internalRepository, 'findOneOrFail').mockResolvedValueOnce(usuario);

      const response = await repository.findByUsername(username);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toBeDefined();
      expect(response.username).toEqual(username);
      expect(response.documento).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.firstName).toBeDefined();
      expect(response.lastName).toBeDefined();
      expect(response.password).toBeDefined();

      expect(internalRepository.findOneOrFail).toBeCalledWith({ where: { username } });
    });

    it('Debería lanzar un error generico', async () => {
      const username = faker.string.alpha();

      jest.spyOn(internalRepository, 'findOneOrFail').mockRejectedValueOnce(new Error('Error - test'));

      await expect(repository.findByUsername(username)).rejects.toThrowError(Error);
      expect(internalRepository.findOneOrFail).toBeCalledWith({ where: { username } });
    });
  });

  describe(`findBy`, () => {
    it(`Debería traer un array de usuarios `, async () => {
      const filters: DeepPartial<Usuario> = mockUsuario();

      const usuario = mockUsuario();

      internalRepository.createQueryBuilder = jest.fn().mockImplementationOnce(() => {
        return {
          ...mockQueryBuilder({ getOneResponse: usuario }),
        };
      });

      const response = await repository.findBy(filters);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toBeDefined();
      expect(response.documento).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.firstName).toBeDefined();
      expect(response.lastName).toBeDefined();
      expect(internalRepository.createQueryBuilder).toBeCalledWith('user');
    });

    it(`Debería lanzar un error generico`, async () => {
      const filters: DeepPartial<Usuario> = mockUsuario();

      internalRepository.createQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          ...mockQueryBuilder({ rejectExecute: true }),
        };
      });
      await expect(repository.findBy(filters)).rejects.toThrowError(Error);
      expect(internalRepository.createQueryBuilder).toBeCalledWith('user');
    });
  });

  describe(`create`, () => {
    it('Debería devolver una instancia de usuario si no ocurre ningun error', async () => {
      const dto = mockCreateUsuarioDTO();

      const response = await repository.create(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toBeDefined();
      expect(response.documento).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.firstName).toBeDefined();
      expect(response.lastName).toBeDefined();
      expect(internalRepository.save).toBeCalledWith(dto);
    });

    it(`Debería lanzar un error generico`, async () => {
      const dto = mockCreateUsuarioDTO();

      jest.spyOn(internalRepository, 'save').mockRejectedValueOnce(new Error('test-error'));

      await expect(repository.create(dto)).rejects.toThrowError(Error);
      expect(internalRepository.save).toBeCalledWith(dto);
    });
  });

  describe(`softDelete`, () => {
    it(`Debería hacer un softDelete un usuario si se le provee el username`, async () => {
      const username = faker.string.alpha();
      await expect(repository.softDelete(username)).resolves.not.toThrowError();
      expect(internalRepository.softDelete).toBeCalledWith({ username });
    });

    it(`Deberia lanzar un error generico al intentar borrar el usuario`, async () => {
      const username = faker.string.alpha();

      jest.spyOn(internalRepository, 'softDelete').mockRejectedValueOnce(new Error('test-error'));
      await expect(repository.softDelete(username)).rejects.toThrowError(Error);

      expect(internalRepository.softDelete).toBeCalledWith({ username });
    });
  });
});
