import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostalCodeQueryDTO } from '../dto/postal-code-query.dto';
import { ViaCepService } from '../services/viacep.service';
import { FindByPostalCodeResponseDto } from '../dto/postal-code-response.dto';

@ApiTags('Via Cep')
@Controller('via-cep')
export class ViaCepController {
  constructor(private readonly viaCepService: ViaCepService) {}

  @ApiOperation({ summary: 'Obter dados pelo CEP' })
  @ApiOkResponse({
    description: 'Dados retornados com sucesso',
    type: FindByPostalCodeResponseDto,
  })
  @Get(':postalCode')
  findOne(
    @Param() params: PostalCodeQueryDTO,
  ): Promise<FindByPostalCodeResponseDto> {
    return this.viaCepService.findByPostalCode(params.postalCode);
  }
}
