import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { validateRegister } from '../utils/validateRegister'
import { CreateUserDTO } from './createUser.dto'
import { User, UserDocument } from './user.model'
import { UserResponse } from './user.resolver'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find({})
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id })
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserResponse> {
    const errors = validateRegister(createUserDTO)
    if (errors) {
      return { errors }
    }
    let user
    try {
      const hashedPassword = await argon2.hash(createUserDTO.password)
      user = await new this.userModel({
        ...createUserDTO,
        password: hashedPassword,
      }).save()
    } catch (err) {
      console.log(err)
      return {
        errors: [
          {
            field: 'username',
            message: 'user already exist',
          },
        ],
      }
    }
    return { user }
  }
}
