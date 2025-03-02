import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  BillingType,
  CreateChargeAsaasDto,
} from '../dto/payments/create-charge-asaas.dto';
import { CreateChargeAsaasResponse } from '../types/payments/CreateChargeAsaasResponse.types';
import {
  ChargeAsaasResponse,
  DigitableBillAsaasResponse,
  PixQrCodeAsaasResponse,
} from '../types/payments/ChargeAsaasResponse.types';
import {
  CreateChargeCardAsaasDto,
  CreditCardTokenizeAsaasDto,
} from '../dto/payments/credit-card-asaas.dto';
import { CreditCardTokenizeAsaasResponse } from '../types/payments/CreditCardAsaasResponse.types';
import { AsaasError } from '../types/asaas/AsaasError.types';
import { AxiosError } from 'axios';

@Injectable()
export class AsaasPaymentsService {
  private ASAAS_URL = `${process.env.ASAAS_URL}`;
  private ASAAS_AUTH = process.env.ASAAS_AUTH;

  constructor(private readonly httpService: HttpService) {}

  public async createCharge(
    dto: CreateChargeAsaasDto,
  ): Promise<CreateChargeAsaasResponse> {
    const URL = `${this.ASAAS_URL}/payments`;

    try {
      const response = await this.httpService.axiosRef.post(
        URL,
        {
          ...dto,
        },
        {
          headers: {
            access_token: this.ASAAS_AUTH,
          },
        },
      );

      return response.data as CreateChargeAsaasResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const assasError = error as AsaasError;
        const statusCode = assasError.response.status;

        const errors = assasError.response.data.errors[0];
        throw new HttpException(errors, statusCode);
      }

      throw new HttpException('Unknown error', 500);
    }
  }

  public async findOneCharge(id: string): Promise<ChargeAsaasResponse> {
    const URL = `${this.ASAAS_URL}/payments/${id}`;

    try {
      const response = await this.httpService.axiosRef.get(URL, {
        headers: {
          access_token: this.ASAAS_AUTH,
        },
      });

      return response.data as ChargeAsaasResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const assasError = error as AsaasError;
        const statusCode = assasError.response.status;

        const errors = assasError.response.data.errors[0];
        throw new HttpException(errors, statusCode);
      }

      throw new HttpException('Unknown error', 500);
    }
  }

  private async creditCardTokenize(
    dto: CreditCardTokenizeAsaasDto,
  ): Promise<CreditCardTokenizeAsaasResponse> {
    const data = {
      ...dto,
      creditCardHolderInfo: { ...dto.creditCardHolderInfo },
    };

    const URL = `${this.ASAAS_URL}/creditCard/tokenize`;

    try {
      const response = await this.httpService.axiosRef.post(
        URL,
        {
          ...data,
        },
        {
          headers: {
            access_token: this.ASAAS_AUTH,
          },
        },
      );

      return response.data as CreditCardTokenizeAsaasResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const assasError = error as AsaasError;
        const statusCode = assasError.response.status;

        const errors = assasError.response.data.errors[0];
        throw new HttpException(errors, statusCode);
      }

      throw new HttpException('Unknown error', 500);
    }
  }

  public async creditCard(
    dto: CreateChargeCardAsaasDto,
    card: CreditCardTokenizeAsaasDto,
  ): Promise<CreateChargeAsaasResponse> {
    const token = await this.creditCardTokenize(card);

    const URL = `${this.ASAAS_URL}/payments`;

    try {
      const response = await this.httpService.axiosRef.post(
        URL,
        {
          ...dto,
          installmentCount: dto.installmentCount,
          creditCardToken: token.creditCardToken,
          authorizeOnly: false,
          billingType: BillingType.CREDIT_CARD,
          creditCardHolderInfo: { ...card.creditCardHolderInfo },
        },
        {
          headers: {
            access_token: this.ASAAS_AUTH,
          },
        },
      );

      return response.data as CreateChargeAsaasResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const assasError = error as AsaasError;
        const statusCode = assasError.response.status;

        const errors = assasError.response.data.errors[0];
        throw new HttpException(errors, statusCode);
      }

      throw new HttpException('Unknown error', 500);
    }
  }

  public async getInvoiceDigitableBill(
    id: string,
  ): Promise<DigitableBillAsaasResponse> {
    const URL = `${this.ASAAS_URL}/payments/${id}/identificationField`;

    try {
      const response = await this.httpService.axiosRef.get(URL, {
        headers: {
          access_token: this.ASAAS_AUTH,
        },
      });

      return response.data as DigitableBillAsaasResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const assasError = error as AsaasError;
        const statusCode = assasError.response.status;

        const errors = assasError.response.data.errors[0];
        throw new HttpException(errors, statusCode);
      }

      throw new HttpException('Unknown error', 500);
    }
  }

  public async getpixQRCode(id: string): Promise<PixQrCodeAsaasResponse> {
    const URL = `${this.ASAAS_URL}/payments/${id}/pixQrCode`;

    try {
      const response = await this.httpService.axiosRef.get(URL, {
        headers: {
          access_token: this.ASAAS_AUTH,
        },
      });

      return response.data as PixQrCodeAsaasResponse;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const assasError = error as AsaasError;
        const statusCode = assasError.response.status;

        const errors = assasError.response.data.errors[0];
        throw new HttpException(errors, statusCode);
      }

      throw new HttpException('Unknown error', 500);
    }
  }
}
