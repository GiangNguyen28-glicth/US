import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../common/decorators/getuser.decorator';
import { AtGuard } from '../../common/guards/at.guard';
import { UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.entities';
import { UserService } from './user.service';

@Resolver(User.name)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => User)
  @UseGuards(AtGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @GetUser() user: User,
  ): Promise<User> {
    const _id = user._id;
    return this.userService.updateUser(input, _id);
  }
}
