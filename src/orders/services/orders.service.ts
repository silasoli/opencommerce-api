import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UsersService } from '../../users/services/users.service';
import { NuvemshopOrdersService } from '../../nuvemshop/services/nuvemshop.orders.service';
import { OrderResponseNuvemShopDto } from '../../nuvemshop/dto/orders/order-response.nuvemshop.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly nuvemshopOrdersService: NuvemshopOrdersService,
  ) {}

  public async create(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<OrderResponseNuvemShopDto> {
    const user = await this.usersService.findOne(userId);

    return this.nuvemshopOrdersService.create({
      ...dto,
      contact_email: user.email,
      currency: 'BRL',
      send_email: true,
    });

    //Cria cobrança no Asaas
    //Retorna pro Front URL de pagamento ou QRCode
    //dados da compra

    //adicionar pagamento por cartao
  }

  public async findAll(userId: string): Promise<OrderResponseNuvemShopDto[]> {
    const user = await this.usersService.findOne(userId);
    //pegar id da nuvemshop salvo no user e pegar as compras dele

    return this.nuvemshopOrdersService.getAllByCustomerId(user.id);
  }

  public async findOne(
    userId: string,
    id: number,
  ): Promise<OrderResponseNuvemShopDto> {
    // const user = await this.usersService.findOne(userId);
    //pegar id da nuvemshop salvo no user e pegar as compras dele

    const order = await this.nuvemshopOrdersService.getById(id);

    // if (order.customer?.id !== customerId) {
    //   throw new NotFoundException('Order does not belong to the current user');
    // }

    return order;
  }
}
