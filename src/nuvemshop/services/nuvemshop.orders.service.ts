import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NuvemshopHttpService } from './nuvemshop.http.service';
import { SERVER_ERRORS } from '../../common/constants/server.errors';
import { CreateOrderNuvemShopDto } from '../dto/orders/create-order.nuvemshop.dto';
import { OrderResponseNuvemShopDto } from '../dto/orders/order-response.nuvemshop.dto';

@Injectable()
export class NuvemshopOrdersService {
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
    this.NUVEMSHOP_URL = `${nuvemshopUrl}/${nuvemshopClientId}/orders`;
  }

  async create(
    dto: CreateOrderNuvemShopDto,
  ): Promise<OrderResponseNuvemShopDto> {
    return this.httpService.post<
      OrderResponseNuvemShopDto,
      CreateOrderNuvemShopDto
    >(this.NUVEMSHOP_URL, dto, {
      Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
      'User-Agent': this.NS_USER_AGENT,
    });
  }

  async getAll(): Promise<OrderResponseNuvemShopDto[]> {
    return this.httpService.get<OrderResponseNuvemShopDto[]>(
      this.NUVEMSHOP_URL,
      {
        Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  async getAllByCustomerId(id: string): Promise<OrderResponseNuvemShopDto[]> {
    const params = new URLSearchParams();
    params.append('customer_ids', id.toString());

    return this.httpService.get<OrderResponseNuvemShopDto[]>(
      `${this.NUVEMSHOP_URL}?${params.toString()}`,
      {
        Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  async getById(id: number): Promise<OrderResponseNuvemShopDto> {
    return this.httpService.get<OrderResponseNuvemShopDto>(
      `${this.NUVEMSHOP_URL}/${id}`,
      {
        Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }
}
