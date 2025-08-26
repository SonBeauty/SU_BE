import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './entities/auth.entity';
import { RegisterInput } from './dto/register.input';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthPayload)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthPayload> {
    return this.authService.register(registerInput);
  }
}
