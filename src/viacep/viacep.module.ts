import { Module } from '@nestjs/common';
import { ViaCepService } from './services/viacep.service';
import { ViaCepController } from './controllers/viacep.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ViaCepController],
  providers: [ViaCepService],
})
export class ViaCepModule {}
