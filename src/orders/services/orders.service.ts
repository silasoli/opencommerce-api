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
    //!!Atencao vamos precisar colocar na hora de cadastrar os produtos os dados do frete (peso, largura etc)

    //encontra os produtos da order (nao precisa)
    //pega os dados do metodo de entrega (shipping_option, os produtos, codigo postal)
    //cria customer no assas, mas ja existe

    //formata produto para salvar (nao precisa)
    //soma valor total com valor do frete

    //cria no assas

    //cria na nuvemshop

    //pega dados do pagamento

    //retorna

    const user = await this.usersService.findOne(userId);

    return this.nuvemshopOrdersService.create({
      ...dto,
      contact_email: user.email,
      currency: 'BRL',
      send_email: true,
      gateway: 'not-provided',
      inventory_behaviour: 'claim',
      customer: {
        name: user.username,
        email: user.email,
      },
      billing_address: dto.billing_address,
      shipping_address: dto.shipping_address,
      shipping_pickup_type: 'ship',
      shipping: 'table',
      shipping_option: 'pegar dos dados do melhor envio',
      //vou precisar buscar os produtos na hora de criar a order, calcular o frete e dps  usar esse valor aqui
      shipping_cost_customer: 10.0,
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
