import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NuvemshopHttpService } from './nuvemshop.http.service';
import { SERVER_ERRORS } from '../../common/constants/server.errors';
import { CreateCustomerNuvemShopDto } from '../dto/customers/create-customer.nuvemshop.dto';
import { UpdateCustomerNuvemShopDto } from '../dto/customers/update-customer.nuvemshop.dto';
import { CustomerResponseNuvemShopDto } from '../dto/customers/customer-response.nuvemshop.dto';

@Injectable()
export class NuvemshopCustomersService {
  private readonly NUVEMSHOP_URL: string;
  private readonly NUVEMSHOP_AUTH: string;
  private readonly NS_USER_AGENT: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: NuvemshopHttpService,
  ) {
    const nuvemshopAuth = this.configService.get<string>('NS_ACCESS_TOKEN');
    if (!nuvemshopAuth) throw SERVER_ERRORS.NOT_FOUND_NUVEMSHOP_AUTH;
    this.NUVEMSHOP_AUTH = nuvemshopAuth;

    const nuvemshopUserAgent = this.configService.get<string>('NS_USER_AGENT');
    if (!nuvemshopUserAgent) throw SERVER_ERRORS.NOT_FOUND_NUVEMSHOP_USER_AGENT;
    this.NS_USER_AGENT = nuvemshopUserAgent;

    const nuvemshopClientId = this.configService.get<string>('NS_CLIENT_ID');
    if (!nuvemshopClientId) throw SERVER_ERRORS.NOT_FOUND_NUVEMSHOP_CLIENT_ID;

    const nuvemshopUrl = this.configService.get<string>('NS_API_URL');
    if (!nuvemshopUrl) throw SERVER_ERRORS.NOT_FOUND_NUVEMSHOP_URL;

    this.NUVEMSHOP_URL = `${nuvemshopUrl}/${nuvemshopClientId}/customers`;
  }

  async create(
    dto: CreateCustomerNuvemShopDto,
  ): Promise<CustomerResponseNuvemShopDto> {
    return this.httpService.post<
      CustomerResponseNuvemShopDto,
      CreateCustomerNuvemShopDto
    >(this.NUVEMSHOP_URL, dto, {
      Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
      'User-Agent': this.NS_USER_AGENT,
    });
  }

  async update(
    id: number,
    dto: UpdateCustomerNuvemShopDto,
  ): Promise<CustomerResponseNuvemShopDto> {
    return this.httpService.put<
      CustomerResponseNuvemShopDto,
      UpdateCustomerNuvemShopDto
    >(`${this.NUVEMSHOP_URL}/${id}`, dto, {
      Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
      'User-Agent': this.NS_USER_AGENT,
    });
  }

  async getAll(): Promise<CustomerResponseNuvemShopDto[]> {
    return this.httpService.get<CustomerResponseNuvemShopDto[]>(
      this.NUVEMSHOP_URL,
      {
        authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  async getById(id: number): Promise<CustomerResponseNuvemShopDto> {
    return this.httpService.get<CustomerResponseNuvemShopDto>(
      `${this.NUVEMSHOP_URL}/${id}`,
      {
        authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  // esse método só funcionará se o cliente não tiver pedidos
  async delete(id: number): Promise<void> {
    await this.httpService.delete<void>(`${this.NUVEMSHOP_URL}/${id}`, {
      authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
      'User-Agent': this.NS_USER_AGENT,
    });
  }
}
