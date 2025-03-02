import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { CreateCustomerAsaasDto } from '../dto/customers/create-customers-asaas.dto';
import { CreateCustomersAsaasResponse } from '../types/customers/CreateCustomersAsaasResponse.types';
import { CustomersAsaasResponse } from '../types/customers/CustomersAsaasResponse.types';
import { ListCustomersAsaasResponse } from '../types/customers/ListCustomersAsaasResponse.types';
import { AsaasError } from '../types/asaas/AsaasError.types';
import { AxiosError } from 'axios';

@Injectable()
export class AsaasCustomersService {
  private ASAAS_URL = `${process.env.ASAAS_URL}/customers`;
  private ASAAS_AUTH = process.env.ASAAS_AUTH;

  constructor(private readonly httpService: HttpService) {}

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
    const URL = `${this.ASAAS_URL}`;

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

      return response.data as CreateCustomersAsaasResponse;
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

  public async findOne(id: string): Promise<CustomersAsaasResponse> {
    const URL = `${this.ASAAS_URL}/${id}`;

    try {
      const response = await this.httpService.axiosRef.get(URL, {
        headers: {
          access_token: this.ASAAS_AUTH,
        },
      });

      return response.data as CustomersAsaasResponse;
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

  public async findOneBycpfCnpj(
    cpfCnpj: string,
  ): Promise<CustomersAsaasResponse | null> {
    const URL = `${this.ASAAS_URL}?cpfCnpj=${cpfCnpj}`;

    const response: AxiosResponse<ListCustomersAsaasResponse> =
      await this.httpService.axiosRef.get(URL, {
        headers: {
          access_token: this.ASAAS_AUTH,
        },
      });

    return !response.data.totalCount ? null : response.data.data[0];
  }

  public async update(
    id: string,
    dto: CreateCustomerAsaasDto,
  ): Promise<CustomersAsaasResponse> {
    const URL = `${this.ASAAS_URL}/${id}`;

    const response = await this.httpService.axiosRef.put(
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

    return response.data as CustomersAsaasResponse;
  }
}
