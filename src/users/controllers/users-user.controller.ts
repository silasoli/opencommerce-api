import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
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
import { Roles } from '../../roles/enums/role.enum';
import { UserRequest } from '../../auth/decorators/user-request.decorator';
import { UserRequestDTO } from '../../auth/dto/user-request.dto';

@ApiBearerAuth()
@ApiTags('Users - User')
@Controller('user/users')
@UseGuards(AuthUserJwtGuard, RoleGuard)
export class UsersUserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obter conta logada' })
  @ApiResponse({
    status: 200,
    description: 'Conta logada retornada com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @Role([Roles.USER])
  @Get('')
  public async findOne(@UserRequest() user: UserRequestDTO) {
    return this.usersService.findOne(user.id);
  }

  @ApiOperation({ summary: 'Editar conta logada' })
  @ApiResponse({
    status: 200,
    description: 'Editação de conta logada realizada com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiBody({ type: UpdateUserDto })
  @Role([Roles.USER])
  @Patch('')
  public async update(
    @UserRequest() user: UserRequestDTO,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, dto);
  }
}
