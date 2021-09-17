import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserDTO {
  @Field()
  username: string
  @Field()
  email: string
  @Field()
  password: string
  @Field({ nullable: true })
  firstName: string
  @Field({ nullable: true })
  lastName: string
}
