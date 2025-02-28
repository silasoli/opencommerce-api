import { Test, TestingModule } from '@nestjs/testing';
import { ViaCepService } from '../services/viacep.service';
import { ViaCepController } from './viacep.controller';

describe('ViaCepController', () => {
  let controller: ViaCepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViaCepController],
      providers: [ViaCepService],
    }).compile();

    controller = module.get<ViaCepController>(ViaCepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
