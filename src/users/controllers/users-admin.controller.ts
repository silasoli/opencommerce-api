import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';
import { AuthUserJwtGuard } from '../../auth/guards/auth-user-jwt.guard';
import { RoleGuard } from '../../roles/guards/role.guard';
import { Role } from '../../roles/decorators/roles.decorator';
import { IDPostgresQueryDTO } from '../../common/dto/id-postgres-query.dto';
import { Roles } from '../../roles/enums/role.enum';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiBearerAuth()
@ApiTags('Users - Admin')
@Controller('admin/users')
@UseGuards(AuthUserJwtGuard, RoleGuard)
export class UsersAdminController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criar conta' })
  @ApiResponse({
    status: 200,
    description: 'Conta criada com sucesso',
    type: UserResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
  @Role([Roles.ADMIN])
  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Obter listagem de contas dos usuários' })
  @ApiResponse({
    status: 200,
    description: 'Listagem de contas dos usuários retornada com sucesso',
    type: [UserResponseDto],
  })
  @Get()
  @Role([Roles.ADMIN])
  public async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obter conta do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Conta do usuário retornada com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @Role([Roles.ADMIN])
  @Get(':id')
  public async findOne(@Param() params: IDPostgresQueryDTO) {
    return this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar conta de usuário' })
  @ApiResponse({
    status: 200,
    description: 'Editar conta de usuário com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiBody({ type: UpdateUserDto })
  @Role([Roles.USER])
  @Patch(':id')
  public async update(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(user._id, dto);
  }

  // @ApiOperation({ summary: 'Deletar conta de um usuário' })
  // @ApiResponse({
  //   status: 204,
  //   description: 'Conta do usuário deletada com sucesso',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Usuário não encontrado.',
  // })
  // @HttpCode(204)
  // @Role([Roles.ADMIN])
  // @Delete(':id')
  // public async remove(@Param() params: IDPostgresQueryDTO) {
  //   return this.usersService.remove(params.id);
  // }
}
