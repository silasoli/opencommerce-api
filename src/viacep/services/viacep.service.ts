import { Injectable } from '@nestjs/common';
import { FindByPostalCodeResponseDto } from '../dto/postal-code-response.dto';
import { FindOneResponse } from '../types/find-one-response.types';
import { ConfigService } from '@nestjs/config';
import { SERVER_ERRORS } from '../../common/constants/server.errors';
import { ViaCepHttpService } from './viacephttp.service';

@Injectable()
export class ViaCepService {
  private readonly VIACEP_URL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly viaCepHttpService: ViaCepHttpService,
  ) {
    this.VIACEP_URL = this.configService.get<string>('VIA_CEP_URL') ?? '';

    if (!this.VIACEP_URL) throw SERVER_ERRORS.NOT_FOUND_VIA_CEP;
  }

  private async findOne(postalCode: string): Promise<FindOneResponse> {
    const URL = `${this.VIACEP_URL}/${postalCode}/json`;
    return this.viaCepHttpService.get<FindOneResponse>(URL);
  }

  public async findByPostalCode(
    postalCode: string,
  ): Promise<FindByPostalCodeResponseDto> {
    const response = await this.findOne(postalCode);
    return new FindByPostalCodeResponseDto(response);
  }
}
