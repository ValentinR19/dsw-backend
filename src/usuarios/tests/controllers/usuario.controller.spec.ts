import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '@usuario-module/controllers/usuario.controller';
import { UsuarioService } from '@usuario-module/services/usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [{ provide: UsuarioService, useValue: {} }],
    })
      .setLogger(Logger)
      .compile();
    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
