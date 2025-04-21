import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user-response.dto';
import { Roles } from '../../roles/enums/role.enum';
// import { ERRORS } from '../../common/utils/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
  ) {}

  private async transformBody(dto: CreateUserDto | UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
  }

  private async findUserByID(id: string): Promise<Users> {
    const user = await this.repository.findOneBy({ id });

    // if (!user) throw ERRORS.USERS.NOT_FOUND;
    if (!user) throw NotFoundException;

    return user;
  }

  public async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const rawData = { ...dto, roles: [Roles.USER] };

    await this.transformBody(rawData);

    const createdUser = this.repository.create(rawData);
    const savedUser = await this.repository.save(createdUser);

    return new UserResponseDto(savedUser);
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

    // if (!user) throw ERRORS.USERS.NOT_FOUND;
    if (!user) throw NotFoundException;

    return user.roles;
  }
}
