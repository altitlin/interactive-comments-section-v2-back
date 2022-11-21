import { Model, sanitizeFilter } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCommentDto } from './dtos/create-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { Comment, CommentDocument } from './schemas/comment.schema'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async create(commentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.create({
      ...commentDto,
      score: 0,
      replies: [],
    })

    return comment
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.find().exec()

    return comments
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentModel.findOne({ _id: { $eq: id } })

    return comment
  }

  async update(id: string, commentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentModel.updateOne({ _id: { $eq: id } }, { $set: sanitizeFilter(commentDto) })

    const comment = await this.commentModel.findOne({ _id: { $eq: id } })

    return comment
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.deleteOne({ _id: { $eq: id } })
  }
}
