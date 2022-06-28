import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../common/decorators/getuser.decorator';
import { RtGuard } from '../common/guards/rt.guard';
import { User } from '../modules/user/entities/user.entities';
import { UserDocument } from '../modules/user/schema/user.schema';
import { UserService } from '../modules/user/user.service';
import { AuthService } from './auth.service';
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Query(() => JwtPayload)
  @UseGuards(RtGuard)
  async refreshToken(@GetUser() user: User): Promise<JwtPayload> {
    const userDoc: UserDocument = await this.userService.getOne({
      _id: user._id,
    });
    return this.authService.setJwt(userDoc);
  }
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
