import { Global, Module } from '@nestjs/common';
import { RoleUtil } from './utils/roles.util';

@Global()
@Module({
  providers: [RoleUtil],
  exports: [RoleUtil],
})
export class RolesModule {}
