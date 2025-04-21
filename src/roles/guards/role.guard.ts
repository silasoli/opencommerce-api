import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { RoleUtil } from '../utils/roles.util';
// import { RequestWithUser } from '../../auth/interfaces/IUser-request.interface';
// import { ERRORS } from '../../common/utils/constants/errors';
import { Roles } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleUtil: RoleUtil,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<any>();
    const user = request.user;

    if (!user.id) return false;

    const requiredActions = this.reflector.getAllAndOverride<Roles[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredActions) return true;

    const userid = String(user.id);

    const verify = await this.roleUtil.userHasRole(userid, requiredActions);

    // if (!verify) throw ERRORS.AUTH.LACK_PERMISSION;
    if (!verify) throw ForbiddenException;

    return verify;
  }
}
