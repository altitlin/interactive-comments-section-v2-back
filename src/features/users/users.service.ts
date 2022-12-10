import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, sanitizeFilter } from 'mongoose'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({
      ...userDto,
      // TODO: should be fixed
      image: '/images/image-ramsesmiron.png',
    })

    return user
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: { $eq: id } })

    return user
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username: { $eq: username } })

    return user
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    await this.userModel.updateOne({ _id: { $eq: id } }, { $set: sanitizeFilter(userDto) })

    const user = await this.userModel.findOne({ _id: { $eq: id } })

    return user
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: { $eq: id } })
  }
}
