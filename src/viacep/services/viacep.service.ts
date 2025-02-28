/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { FindByPostalCodeResponseDto } from '../dto/postal-code-respnse.dto';
import { FindOneResponse } from '../types/find-one-response.types';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { ConfigService } from '@nestjs/config';
import { SERVER_ERRORS } from '../../common/constants/server.errors';

@Injectable()
export class ViaCepService {
  private VIACEP_URL: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.VIACEP_URL = this.configService.get<string>('VIA_CEP_URL');

    if (!this.VIACEP_URL) throw SERVER_ERRORS.NOT_FOUND_VIA_CEP;
  }

  private async findOne(
    postalCode: string,
  ): Promise<AxiosResponse<FindOneResponse>> {
    const URL = `${this.VIACEP_URL}/${postalCode}/json`;

    try {
      const response = await this.httpService.axiosRef.get(URL);

      return response.data as AxiosResponse<FindOneResponse>;
    } catch (error) {
      // console.log(error.response.data)
      const statusCode = error.response.status;
      throw new HttpException({}, statusCode as number);
    }
  }

  public async findByPostalCode(
    postalCode: string,
  ): Promise<FindByPostalCodeResponseDto> {
    const response = await this.findOne(postalCode);
    return new FindByPostalCodeResponseDto(response);
  }
}
