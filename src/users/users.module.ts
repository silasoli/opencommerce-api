import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../database/entities/users.entity';
import { UsersUserController } from './controllers/users-user.controller';
import { UsersAdminController } from './controllers/users-admin.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersUserController, UsersAdminController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
