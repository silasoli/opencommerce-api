import { Injectable } from '@nestjs/common';
import { CreateOrderDto, ProductItemDto } from '../dto/create-order.dto';
import { UsersService } from '../../users/services/users.service';
import { NuvemshopOrdersService } from '../../nuvemshop/services/nuvemshop.orders.service';
import { OrderResponseNuvemShopDto } from '../../nuvemshop/dto/orders/order-response.nuvemshop.dto';
import { NuvemshopProductsService } from '../../nuvemshop/services/nuvemshop.products.service';
import { MelhorEnvioService } from '../../melhor-envio/services/melhor-envio.service';
import { ShipmentCalculateMelhorEnvioResponse } from '../../melhor-envio/types/shipment-calculate.types';
import { ORDERS_ERRORS } from '../constants/orders.errors';
import { ProductsVariantsToShipping } from '../types/orders.type';

@Injectable()
export class OrdersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly nuvemshopOrdersService: NuvemshopOrdersService,
    private readonly nuvemshopProductsService: NuvemshopProductsService,
    private readonly melhorEnvioService: MelhorEnvioService,
  ) { }

  //!!Atencao vamos precisar colocar na hora de cadastrar os produtos os dados do frete (peso, largura etc)
  private async findVariantsByOrder(
    dto: ProductItemDto[],
  ): Promise<ProductsVariantsToShipping[]> {
    const results = await Promise.all(
      dto.map(async (item) => {
        const variant = await this.nuvemshopProductsService.getVariantById(
          item.product_id,
          item.variant_id,
        );

        if (!variant) throw ORDERS_ERRORS.VARIANT_NOT_FOUND;

        return {
          variant,
          quantity: item.quantity,
        };
      }),
    );

    return results;
  }

  private async getShippingSelected(
    shippingOptionId: number,
    products: ProductsVariantsToShipping[],
    postal_code: string,
  ): Promise<ShipmentCalculateMelhorEnvioResponse> {
    const shipping = await this.melhorEnvioService.seekDeliveryQuote({
      products,
      postal_code,
    });

    const selectedShipping = shipping.find(
      (item) => item.id === shippingOptionId,
    );

    if (!selectedShipping) throw ORDERS_ERRORS.SHIPPING_NOT_FOUND;

    return selectedShipping;
  }

  public async estimateShipping(dto: {
    products: ProductItemDto[];
    postal_code: string;
  }) {
    //testar product not found
    const variants = await this.findVariantsByOrder(dto.products);

    return this.melhorEnvioService.seekDeliveryQuote({
      products: variants,
      postal_code: dto.postal_code,
    });
  }

  public calculateTotalOrderValue(
    products: ProductItemDto[],
    variants: ProductsVariantsToShipping[],
    // installmentCount?: number,
  ): number {
    let totalValue = 0;

    for (const product of products) {
      const match = variants.find((v) => v.variant.id === product.variant_id);

      if (!match) throw ORDERS_ERRORS.VARIANT_NOT_FOUND;

      const price = parseFloat(
        match.variant.promotional_price ?? match.variant.price,
      );

      totalValue += price * product.quantity;
    }

    // if (installmentCount) {
    //   // Supondo que você tenha um método `calculateInstallments`
    //   return this.calculateInstallments(totalValue, [installmentCount])[0]
    //     .amount;
    // }

    return totalValue;
  }

  public async create(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<OrderResponseNuvemShopDto> {
    //encontra os produtos da order na nuvemshop
    //pega os dados do metodo de entrega (shipping_option, os produtos, codigo postal)
    //cria customer no assas, mas ja existe (nao precisa)

    //formata produto para salvar (nao precisa)
    //soma valor total com valor do frete

    //cria no assas

    //cria na nuvemshop

    //pega dados do pagamento

    //retorna

    // const user = await this.usersService.findOne(userId);
    const variants = await this.findVariantsByOrder(dto.products);

    const shipping = await this.getShippingSelected(
      dto.shippingOptionId,
      variants,
      dto.shipping_address.zipcode,
    );

    const amount = this.calculateTotalOrderValue(
      dto.products,
      variants,
      // dto.installmentCount,
    );

    const amountWithShipping = amount + parseFloat(shipping.price);

    return {
      amount,
      amount_with_shipping: amountWithShipping,
    } as any;

    // return amount as any;

    // return this.nuvemshopOrdersService.create({
    //   ...dto,
    //   contact_email: user.email,
    //   currency: 'BRL',
    //   send_email: true,
    //   gateway: 'not-provided',
    //   inventory_behaviour: 'claim',
    //   customer: {
    //     name: user.username,
    //     email: user.email,
    //   },
    //   billing_address: dto.billing_address,
    //   shipping_address: dto.shipping_address,
    //   shipping_pickup_type: 'ship',
    //   shipping: 'table',
    //   shipping_option: 'pegar dos dados do melhor envio',
    //   //vou precisar buscar os produtos na hora de criar a order, calcular o frete e dps  usar esse valor aqui
    //   shipping_cost_customer: 10.0,
    // });
  }

  //Cria cobrança no Asaas
  //Retorna pro Front URL de pagamento ou QRCode
  //dados da compra

  //adicionar pagamento por cartao

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
