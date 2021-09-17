import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'
import { genUUID } from 'src/utils/genUUID'

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  @Prop({ default: genUUID() })
  _id: string

  @Field(() => String, { nullable: true })
  @Prop()
  firstName?: string

  @Field(() => String, { nullable: true })
  @Prop()
  lastName?: string

  @Field(() => String)
  @Prop({ required: true, unique: true })
  username!: string

  @Field(() => String)
  @Prop({ required: true, unique: true })
  email!: string

  @Prop({ required: true })
  password!: string

  @Field(() => Boolean)
  @Prop({ default: false })
  isDeleted!: boolean

  @Field(() => String)
  @Prop({ type: Date, default: Date.now })
  createdAt: string

  @Field(() => String)
  @Prop({ type: Date, default: Date.now })
  updatedAt: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
