import { Module } from '@nestjs/common';
import { MelhorEnvioController } from './controllers/melhor-envio.controller';
import { MelhorEnvioService } from './services/melhor-envio.service';
import { MelhorEnvioHttpService } from './services/melhor-envio-http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MelhorEnvioController],
  providers: [MelhorEnvioHttpService, MelhorEnvioService],
  exports: [MelhorEnvioService],
})
export class MelhorEnvioModule {}
