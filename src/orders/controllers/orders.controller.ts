import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
  Ip,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
// import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrdersService } from '../services/orders.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { RoleGuard } from '../../roles/guards/role.guard';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { OrderResponseNuvemShopDto } from '../../nuvemshop/dto/orders/order-response.nuvemshop.dto';
import { Role } from '../../roles/decorators/roles.decorator';
import { Roles } from '../../roles/enums/role.enum';
import { IDNumberQueryDTO } from '../../common/dto/id-number-query.dto';
import { CheckStatusResponseDto } from '../dto/check-status-response.dto';

@ApiBearerAuth()
@ApiTags('Orders - User')
@Controller('user/orders')
@UseGuards(AuthUserJwtGuard, RoleGuard)
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @ApiOperation({ summary: 'Criar compra' })
  @ApiResponse({
    status: 200,
    description: 'Compra criada com sucesso',
    type: OrderResponseNuvemShopDto,
  })
  @ApiBody({ type: CreateOrderDto })
  @Role([Roles.USER])
  @Post()
  create(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: CreateOrderDto,
    @Ip() ip: string,
    // ): Promise<OrderResponseNuvemShopDto> {
  ): Promise<unknown> {
    return this.service.create(user.id, dto, ip);
    // return this.service.create('123', dto, ip);
  }

  @ApiOperation({ summary: 'Retorna as compras do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Compras do usuário retornadas com sucesso',
    type: [OrderResponseNuvemShopDto],
  })
  @Get()
  findAll(
    @UserRequest() user: UserRequestDTO,
  ): Promise<OrderResponseNuvemShopDto[]> {
    return this.service.findAll(user.id);
  }

  @ApiOperation({ summary: 'Retorna a compra do usuário por id' })
  @ApiResponse({
    status: 200,
    description: 'Compra do usuário retornada com sucesso',
    type: OrderResponseNuvemShopDto,
  })
  @Get(':id')
  findOne(
    @UserRequest() user: UserRequestDTO,
    @Param() params: IDNumberQueryDTO,
  ): Promise<OrderResponseNuvemShopDto> {
    return this.service.findOne(user.id, params.id);
  }

  @Get(':id/check-status')
  @ApiOkResponse({
    type: CheckStatusResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado',
  })
  public checkStatus(
    @UserRequest() user: UserRequestDTO,
    @Param() params: IDNumberQueryDTO,
  ): Promise<CheckStatusResponseDto> {
    return this.service.checkStatusByID(user.id, params.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
