import { Injectable } from '@nestjs/common';
import { CreateCustomerAsaasDto } from '../dto/customers/create-customers-asaas.dto';
import { CreateCustomersAsaasResponse } from '../types/customers/CreateCustomersAsaasResponse.types';
import { CustomersAsaasResponse } from '../types/customers/CustomersAsaasResponse.types';
import { ListCustomersAsaasResponse } from '../types/customers/ListCustomersAsaasResponse.types';
import { AsaasHttpService } from './asaas.http.service';
import { SERVER_ERRORS } from '../../common/constants/server.errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AsaasCustomersService {
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
    this.ASAAS_URL = `${asaasUrl}/customers`;
  }

  public async createOrUpdate(
    dto: CreateCustomerAsaasDto,
  ): Promise<CreateCustomersAsaasResponse | CustomersAsaasResponse> {
    const exist = await this.findOneBycpfCnpj(dto.cpfCnpj);
    if (exist) return exist;
    return this.create(dto);
  }

  public async create(
    dto: CreateCustomerAsaasDto,
  ): Promise<CreateCustomersAsaasResponse> {
    return this.asaasHttpService.post<
      CreateCustomersAsaasResponse,
      CreateCustomerAsaasDto
    >(this.ASAAS_URL, dto, { access_token: this.ASAAS_AUTH });
  }

  public async findOne(id: string): Promise<CustomersAsaasResponse> {
    return this.asaasHttpService.get<CustomersAsaasResponse>(
      `${this.ASAAS_URL}/${id}`,
      { access_token: this.ASAAS_AUTH },
    );
  }

  public async findOneBycpfCnpj(
    cpfCnpj: string,
  ): Promise<CustomersAsaasResponse | null> {
    const response =
      await this.asaasHttpService.get<ListCustomersAsaasResponse>(
        `${this.ASAAS_URL}?cpfCnpj=${cpfCnpj}`,
        { access_token: this.ASAAS_AUTH },
      );

    return response.totalCount ? response.data[0] : null;
  }

  public async update(
    id: string,
    dto: CreateCustomerAsaasDto,
  ): Promise<CustomersAsaasResponse> {
    return this.asaasHttpService.put<
      CustomersAsaasResponse,
      CreateCustomerAsaasDto
    >(`${this.ASAAS_URL}/${id}`, dto, { access_token: this.ASAAS_AUTH });
  }

  public async delete(id: string): Promise<void> {
    await this.asaasHttpService.delete(`${this.ASAAS_URL}/${id}`, {
      access_token: this.ASAAS_AUTH,
    });
  }
}
