import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CardAsaasDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the card holder' })
  holderName: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Card number' })
  number: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Expiration month of the card' })
  expiryMonth: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Expiration year of the card' })
  expiryYear: string;

  @IsNotEmpty()
  @Length(3, 4)
  @ApiProperty({ description: 'CCV code of the card' })
  ccv: string;
}
