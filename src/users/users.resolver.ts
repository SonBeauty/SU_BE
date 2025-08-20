import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { BaseResolver } from '../core/abstracts/base.resolver';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver extends BaseResolver(User, CreateUserInput, UpdateUserInput) {
  constructor(public service: UsersService) {
    super();
  }
}
