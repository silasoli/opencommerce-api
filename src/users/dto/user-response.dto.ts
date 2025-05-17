import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../database/entities/users.entity';

export class UserResponseDto {
  constructor(user: Users) {
    const {
      id,
      username,
      email,
      asaas_customer_id,
      // nuvemshop_customer_id,
      password,
    } = user;

    return {
      id: String(id),
      username,
      email,
      asaas_customer_id,
      // nuvemshop_customer_id
      password,
    };
  }

  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  asaas_customer_id: string;

  // @ApiProperty({ required: true })
  // nuvemshop_customer_id: number;

  @ApiProperty({ required: true })
  password: string;
}
