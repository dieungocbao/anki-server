import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { CreateUserDTO } from './createUser.dto'
import { User } from './user.model'
import { UserService } from './user.service'

@ObjectType()
export class FieldError {
  @Field()
  field: string
  @Field()
  message: string
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User | undefined> {
    return this.userService.findOneById(id)
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDTO,
  ): Promise<UserResponse> {
    return this.userService.createUser(createUserInput)
  }
}
