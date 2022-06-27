import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => JwtPayload)
  async login(@Args('input') input: LoginInput): Promise<JwtPayload> {
    return await this.authService.signIn(input);
  }
  @Mutation(() => Boolean)
  async register(@Args('input') input: RegisterInput): Promise<boolean> {
    return this.authService.signUp(input);
  }
  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string): Promise<boolean> {
    return this.authService.forgotPassword(email);
  }
  @Mutation(() => Boolean)
  async resetPassword(
    @Args('input') input: ResetPasswordInput,
  ): Promise<boolean> {
    return this.authService.resetPassword(input);
  }
}
