import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserLoginResponseDto } from '../dto/user-login-response.dto';

@ApiTags('Session')
@Controller('session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Realizar login' })
  @ApiResponse({
    status: 201,
    description: 'Conta de usuário criada com sucesso',
  })
  @ApiBody({ type: UserLoginDto })
  @Post('/signin')
  public async login(@Body() dto: UserLoginDto): Promise<UserLoginResponseDto> {
    return this.authService.authenticateUser(dto);
  }
}
