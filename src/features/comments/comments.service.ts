import { Model, sanitizeFilter, isValidObjectId } from 'mongoose'
import {
  Injectable,
  HttpException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'

import { CreateCommentDto } from './dtos/create-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { isValidCreateCommentDto } from './comments.helpers'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async create(commentDto: CreateCommentDto): Promise<Comment> {
    try {
      if (!isValidCreateCommentDto(commentDto)) {
        throw new BadRequestException(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidCreateCommentDto)
      }

      if (!isValidObjectId(commentDto.user)) {
        throw new BadRequestException(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidUserID)
      }

      const comment = await this.commentModel.create({
        ...commentDto,
        score: 0,
        replies: [],
      })

      return comment
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findAll(): Promise<Comment[]> {
    try {
      const comments = await this.commentModel.find()

      return comments
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: string): Promise<Comment> {
    try {
      const comment = await this.commentModel.findOne({ _id: { $eq: id } })

      if (!comment) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
      }

      return comment
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async update(id: string, commentDto: UpdateCommentDto): Promise<Comment> {
    try {
      const canditate = await this.findOne(id)

      if (!canditate) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
      }

      await this.commentModel.updateOne({ _id: { $eq: id } }, { $set: sanitizeFilter(commentDto) })

      const updatedComment = await this.findOne(id)

      return updatedComment
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const isCommentExists = await this.findOne(id)

      if (!isCommentExists) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
      }

      await this.commentModel.deleteOne({ _id: { $eq: id } })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
