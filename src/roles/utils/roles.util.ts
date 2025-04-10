import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { Roles } from '../enums/role.enum';

@Injectable()
export class RoleUtil {
  constructor(private readonly usersService: UsersService) {}

  public async userHasRole(
    userid: string,
    requiredRoles: Roles[],
  ): Promise<boolean> {
    const userRoles = await this.usersService.findRolesOfUser(userid);

    if (!userRoles) return false;

    return this.roleHasAction(userRoles, requiredRoles);
  }

  public roleHasAction(roles: Roles[], requiredRoles: Roles[]): boolean {
    for (const role of requiredRoles) {
      if (roles.includes(role)) return true;
    }
    return false;
  }
}
