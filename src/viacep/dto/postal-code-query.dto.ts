import { ApiProperty } from '@nestjs/swagger';
import { IsPostalCode } from 'class-validator';

export class PostalCodeQueryDTO {
  @ApiProperty({ required: true, example: '01001-000' })
  @IsPostalCode('BR')
  postalCode: string;
}
