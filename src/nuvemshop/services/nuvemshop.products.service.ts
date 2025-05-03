import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NuvemshopHttpService } from './nuvemshop.http.service';
import { SERVER_ERRORS } from '../../common/constants/server.errors';
// import { CreateProductNuvemShopDto } from '../dto/products/create-product.nuvemshop.dto';
// import { UpdateProductNuvemShopDto } from '../dto/products/update-product.nuvemshop.dto';
import { ProductResponseNuvemShopDto } from '../dto/products/product-response.nuvemshop.dto';
// import { ListProductsResponseNuvemShopDto } from '../dto/products/list-products-response.nuvemshop.dto';
import { CreateProductNuvemShopDto } from '../dto/products/create-product.nuvemshop.dto';
import { ProductVariantResponseNuvemShopDto } from '../dto/products/product-variant-response.nuvemshop.dto';

@Injectable()
export class NuvemshopProductsService {
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
    this.NUVEMSHOP_URL = `${nuvemshopUrl}/${nuvemshopClientId}/products`;
  }

  //esse metodo não sera utilizado pelo sistema, utilizaremos o dashboard para criar produtos
  //esse meotodo exise apenas para testes
  async create(
    dto: CreateProductNuvemShopDto,
  ): Promise<ProductResponseNuvemShopDto> {
    return this.httpService.post<
      ProductResponseNuvemShopDto,
      CreateProductNuvemShopDto
    >(this.NUVEMSHOP_URL, dto, {
      Authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
      'User-Agent': this.NS_USER_AGENT,
    });
  }

  async getAll(): Promise<ProductResponseNuvemShopDto[]> {
    return this.httpService.get<ProductResponseNuvemShopDto[]>(
      this.NUVEMSHOP_URL,
      {
        authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  async getById(id: number): Promise<ProductResponseNuvemShopDto> {
    return this.httpService.get<ProductResponseNuvemShopDto>(
      `${this.NUVEMSHOP_URL}/${id}`,
      {
        authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  async getVariantById(
    productId: number,
    variantId: number,
  ): Promise<ProductVariantResponseNuvemShopDto> {
    return this.httpService.get<ProductVariantResponseNuvemShopDto>(
      `${this.NUVEMSHOP_URL}/${productId}/variants/${variantId}`,
      {
        authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
        'User-Agent': this.NS_USER_AGENT,
      },
    );
  }

  // async update(
  //   id: number,
  //   dto: UpdateProductNuvemShopDto,
  // ): Promise<ProductResponseNuvemShopDto> {
  //   return this.httpService.put<
  //     ProductResponseNuvemShopDto,
  //     UpdateProductNuvemShopDto
  //   >(`${this.NUVEMSHOP_URL}/${id}`, dto, {
  //     authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
  //     'User-Agent': this.NS_USER_AGENT,
  //   });
  // }

  // async delete(id: number): Promise<void> {
  //   await this.httpService.put(
  //     `${this.NUVEMSHOP_URL}/${id}`,
  //     { active: false },
  //     {
  //       authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
  //       'User-Agent': this.NS_USER_AGENT,
  //     },
  //   );
  // }

  async delete(id: number): Promise<void> {
    await this.httpService.delete(`${this.NUVEMSHOP_URL}/${id}`, {
      authentication: `bearer ${this.NUVEMSHOP_AUTH}`,
      'User-Agent': this.NS_USER_AGENT,
    });
  }
}
