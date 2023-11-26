import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '@usuario-module/controllers/usuario.controller';
import { UsuarioNotFoundException } from '@usuario-module/exceptions/usuario-not-found.exception';
import { UsuarioNotSavedException } from '@usuario-module/exceptions/usuario-not-saved.exception';
import { Usuario } from '@usuario-module/models/classes/usuario.entity';
import { UsuarioService } from '@usuario-module/services/usuario.service';
import { mockCreateUsuarioDTO, mockUpdateUsuarioDTO, mockUsuarioService } from '@usuario-module/tests/mocks/usuario.mock';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [{ provide: UsuarioService, useValue: mockUsuarioService }],
    })
      .setLogger(Logger)
      .compile();
    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('Deberia estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe(`getByUsername`, () => {
    it(`Debería devolver un usuario`, async () => {
      const username = faker.string.alpha();

      const response = await controller.getByUsername(username);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toEqual(username);
      expect(service.findBy).toBeCalledWith({ username });
    });

    it(`Debería lanzar un error de tipo UsuarioNotFoundException`, async () => {
      const username = faker.string.alpha();

      jest.spyOn(service, 'findBy').mockRejectedValueOnce(new UsuarioNotFoundException());
      await expect(controller.getByUsername(username)).rejects.toThrowError(UsuarioNotFoundException);

      expect(service.findBy).toBeCalledWith({ username });
    });
  });

  describe(`create`, () => {
    it(`Debería retornar un nuevo usuario con username definido`, async () => {
      const dto = mockCreateUsuarioDTO();
      const response = await controller.create(dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toBeDefined();
      expect(service.create).toBeCalledWith(dto);
    });

    it(`Debería lanzar un error de tipo UsuarioNotSavedException`, async () => {
      const dto = mockCreateUsuarioDTO();
      jest.spyOn(service, 'create').mockRejectedValueOnce(new UsuarioNotSavedException('test-error'));

      await expect(controller.create(dto)).rejects.toThrowError(UsuarioNotSavedException);

      expect(service.create).toBeCalledWith(dto);
    });
  });

  describe(`softDelete`, () => {
    it(`Debería hacer un softDelete un usuario si se le provee el username`, async () => {
      const username = faker.string.alpha();
      await expect(controller.softDelete(username)).resolves.not.toThrowError();
      expect(service.softDelete).toBeCalledWith(username);
    });

    it(`Deberia lanzar un error de tipo UsuarioNotSavedException al intentar borrar el usuario`, async () => {
      const username = faker.string.alpha();

      jest.spyOn(service, 'softDelete').mockRejectedValueOnce(new UsuarioNotSavedException('test-error'));
      await expect(controller.softDelete(username)).rejects.toThrowError(UsuarioNotSavedException);

      expect(service.softDelete).toBeCalledWith(username);
    });
  });

  describe(`update`, () => {
    it(`Debería devolver un usuario actualizado si se le provee un username correcto`, async () => {
      const username = faker.string.alpha();
      const dto = mockUpdateUsuarioDTO();
      const response = await controller.update(username, dto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Usuario);
      expect(response.username).toEqual(username);
      expect(response.password).toBeDefined();
      expect(response.firstName).toEqual(dto.firstName);
      expect(response.lastName).toEqual(dto.lastName);
      expect(response.email).toEqual(dto.email);
      expect(service.update).toBeCalledWith(username, dto);
    });

    it(`Debería lanzar un error de tipo UsuarioNotSavedException si ocurre algun fallo en el update`, async () => {
      const username = faker.string.alpha();
      const dto = mockUpdateUsuarioDTO();
      jest.spyOn(service, 'update').mockRejectedValueOnce(new UsuarioNotSavedException('test-error'));

      await expect(controller.update(username, dto)).rejects.toThrowError(UsuarioNotSavedException);

      expect(service.update).toBeCalledWith(username, dto);
    });
  });
});
