import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { BaseService } from 'src/core/abstracts/base.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends BaseService<'user'> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const data = {
      ...createUserInput,
      password: hashedPassword,
    };
    return this.prisma.user.create({ data });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}

