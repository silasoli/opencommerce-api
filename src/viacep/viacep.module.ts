import { Module } from '@nestjs/common';
import { ViaCepService } from './services/viacep.service';
import { ViaCepController } from './controllers/viacep.controller';
import { HttpModule } from '@nestjs/axios';
import { ViaCepHttpService } from './services/viacephttp.service';

@Module({
  imports: [HttpModule],
  controllers: [ViaCepController],
  providers: [ViaCepHttpService, ViaCepService],
})
export class ViaCepModule {}
