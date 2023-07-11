import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Subscription(() => String)
  newMessage() {
    return pubSub.asyncIterator('newMessage');
  }
}
