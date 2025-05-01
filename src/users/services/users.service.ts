import { Injectable } from '@nestjs/common';
import { Users } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user-response.dto';
import { Roles } from '../../roles/enums/role.enum';
import { NuvemshopCustomersService } from '../../nuvemshop/services/nuvemshop.customers.service';
import { AsaasCustomersService } from '../../asaas/services/asaas.customers.service';
import { USERS_ERRORS } from '../constants/users.errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
    private readonly nuvemshopCustomersService: NuvemshopCustomersService,
    private readonly asaasCustomersService: AsaasCustomersService,
  ) {}

  private async transformBody(dto: CreateUserDto | UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
  }

  private async findUserByID(id: string): Promise<Users> {
    const user = await this.repository.findOneBy({ id });

    if (!user) throw USERS_ERRORS.NOT_FOUND;

    return user;
  }

  private async findOrCreateCustomerInNuvemshop(
    dto: CreateUserDto,
  ): Promise<{ id: number; wasCreated: boolean }> {
    const existingCustomer = await this.nuvemshopCustomersService.getByEmail(
      dto.email,
    );

    if (existingCustomer) return { id: existingCustomer.id, wasCreated: false };

    const created = await this.nuvemshopCustomersService.create({
      name: dto.username,
      email: dto.email,
      phone: dto.mobilePhone,
      addresses: [
        {
          address: dto.address,
          city: dto.city,
          country: 'Brasil',
          number: dto.addressNumber,
          province: dto.province,
          zipcode: dto.postalCode,
        },
      ],
    });

    return { id: created.id, wasCreated: true };
  }

  private async findOrCreateCustomerInAsaas(
    dto: CreateUserDto,
  ): Promise<{ id: string; wasCreated: boolean }> {
    const existingCustomer = await this.asaasCustomersService.findOneBycpfCnpj(
      dto.cpfCnpj,
    );

    if (existingCustomer) return { id: existingCustomer.id, wasCreated: false };

    const created = await this.asaasCustomersService.create({
      name: dto.username,
      ...dto,
    });

    return { id: created.id, wasCreated: true };
  }

  private async rollbackUserCreation(
    savedUser: Users | null,
    nuvemshopCustomer: { id: number; wasCreated: boolean } | null,
    asaasCustomer: { id: string; wasCreated: boolean } | null,
  ) {
    if (savedUser?.id) {
      await this.repository.delete({ id: savedUser.id });
    }

    if (nuvemshopCustomer?.wasCreated) {
      await this.nuvemshopCustomersService.delete(nuvemshopCustomer.id);
    }

    if (asaasCustomer?.wasCreated) {
      await this.asaasCustomersService.delete(asaasCustomer.id);
    }
  }

  public async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const rawData = { ...dto, roles: [Roles.USER] };
    await this.transformBody(rawData);

    let savedUser: Users | null = null;
    let nuvemshopCustomer: { id: number; wasCreated: boolean } | null = null;
    let asaasCustomer: { id: string; wasCreated: boolean } | null = null;

    try {
      nuvemshopCustomer = await this.findOrCreateCustomerInNuvemshop(dto);
      // rawData.nuvemshop_customer_id = nuvemshopCustomer.id;

      asaasCustomer = await this.findOrCreateCustomerInAsaas(dto);
      // rawData.asaas_customer_id = asaasCustomer.id;

      const createdUser = this.repository.create(rawData);
      savedUser = await this.repository.save(createdUser);

      return new UserResponseDto(savedUser);
    } catch (error) {
      await this.rollbackUserCreation(
        savedUser,
        nuvemshopCustomer,
        asaasCustomer,
      );

      throw USERS_ERRORS.CREATE_ERROR;
    }
  }

  public async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repository.find();
    return users.map((user) => new UserResponseDto(user));
  }

  public async findByEmail(email: string): Promise<Users | null> {
    return this.repository.findOne({
      where: { email: email.toLowerCase() },
      select: ['id', 'email', 'password', 'username', 'roles'],
    });
  }

  public async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.findUserByID(id);
    return new UserResponseDto(user);
  }

  public async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.findUserByID(id);

    const rawData = { ...dto };
    await this.transformBody(rawData);

    await this.repository.update({ id }, rawData);

    return this.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findUserByID(id);
    await this.repository.remove(user);
  }

  public async comparePass(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async findRolesOfUser(id: string): Promise<Roles[]> {
    const user = await this.repository.findOne({
      where: { id },
      select: ['roles'],
    });

    if (!user) throw USERS_ERRORS.NOT_FOUND;

    return user.roles;
  }
}
