import { Injectable } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';
import { AsaasHttpService } from './asaas.http.service';
import { SERVER_ERRORS } from '../../common/constants/server.errors';

@Injectable()
export class AsaasPaymentsService {
  private readonly ASAAS_URL: string;
  private readonly ASAAS_AUTH: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly asaasHttpService: AsaasHttpService,
  ) {
    const asaasAuth = this.configService.get<string>('ASAAS_AUTH');
    if (!asaasAuth) throw SERVER_ERRORS.NOT_FOUND_ASAAS_AUTH;
    this.ASAAS_AUTH = asaasAuth;

    const asaasUrl = this.configService.get<string>('ASAAS_URL');
    if (!asaasUrl) throw SERVER_ERRORS.NOT_FOUND_ASAAS_URL;
    this.ASAAS_URL = `${asaasUrl}`;
  }
  public async createCharge(
    dto: CreateChargeAsaasDto,
  ): Promise<CreateChargeAsaasResponse> {
    return this.asaasHttpService.post<
      CreateChargeAsaasResponse,
      CreateChargeAsaasDto
    >(`${this.ASAAS_URL}/payments`, dto, { access_token: this.ASAAS_AUTH });
  }

  public async findOneCharge(id: string): Promise<ChargeAsaasResponse> {
    return this.asaasHttpService.get<ChargeAsaasResponse>(
      `${this.ASAAS_URL}/payments/${id}`,
      { access_token: this.ASAAS_AUTH },
    );
  }

  private async creditCardTokenize(
    dto: CreditCardTokenizeAsaasDto,
  ): Promise<CreditCardTokenizeAsaasResponse> {
    return this.asaasHttpService.post<
      CreditCardTokenizeAsaasResponse,
      CreditCardTokenizeAsaasDto
    >(`${this.ASAAS_URL}/creditCard/tokenize`, dto, {
      access_token: this.ASAAS_AUTH,
    });
  }

  public async creditCard(
    dto: CreateChargeCardAsaasDto,
    card: CreditCardTokenizeAsaasDto,
  ): Promise<CreateChargeAsaasResponse> {
    const token = await this.creditCardTokenize(card);
    return this.asaasHttpService.post<
      CreateChargeAsaasResponse,
      CreateChargeCardAsaasDto
    >(
      `${this.ASAAS_URL}/payments`,
      {
        ...dto,
        installmentCount: dto.installmentCount,
        creditCardToken: token.creditCardToken,
        authorizeOnly: false,
        billingType: BillingType.CREDIT_CARD,
        creditCardHolderInfo: { ...card.creditCardHolderInfo },
      },
      { access_token: this.ASAAS_AUTH },
    );
  }

  public async getInvoiceDigitableBill(
    id: string,
  ): Promise<DigitableBillAsaasResponse> {
    return this.asaasHttpService.get<DigitableBillAsaasResponse>(
      `${this.ASAAS_URL}/payments/${id}/identificationField`,
      { access_token: this.ASAAS_AUTH },
    );
  }

  public async getPixQRCode(id: string): Promise<PixQrCodeAsaasResponse> {
    return this.asaasHttpService.get<PixQrCodeAsaasResponse>(
      `${this.ASAAS_URL}/payments/${id}/pixQrCode`,
      { access_token: this.ASAAS_AUTH },
    );
  }
}
