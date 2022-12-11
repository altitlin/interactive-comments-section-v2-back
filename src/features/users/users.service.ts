import {
  Injectable,
  HttpException,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, sanitizeFilter } from 'mongoose'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create({
        ...userDto,
        // TODO: should be fixed
        image: '/images/image-ramsesmiron.png',
      })

      return user
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ _id: { $eq: id } })

      return user
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username: { $eq: username } })

      return user
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    try {
      const canditate = await this.findOne(id)

      if (!canditate) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
      }

      await this.userModel.updateOne({ _id: { $eq: id } }, { $set: sanitizeFilter(userDto) })

      const updatedUser = await this.findOne(id)

      return updatedUser
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const canditate = await this.findOne(id)

      if (!canditate) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
      }

      await this.userModel.deleteOne({ _id: { $eq: id } })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
