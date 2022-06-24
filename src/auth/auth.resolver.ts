import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => JwtPayload)
  async signIn(@Args('input') input: LoginInput): Promise<JwtPayload> {
    return await this.authService.signIn(input);
  }
  @Mutation(() => Boolean)
  async register(@Args('input') input: RegisterInput): Promise<boolean> {
    return this.authService.signUp(input);
  }
}
