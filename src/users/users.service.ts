import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { BaseService } from 'src/core/abstracts/base.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UsersService extends BaseService<'user'> {
  constructor(prismaService: PrismaService,) {
    super(prismaService, 'user');
  }
}

