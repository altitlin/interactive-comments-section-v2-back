import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateCommentDto } from './dtos/create-comment.dto'
import { Comment, CommentDocument } from './schemas/comment.schema'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.find().exec()

    return comments
  }

  async create(commentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.create({
      ...commentDto,
      score: 0,
      replies: [],
    })

    return comment
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id)
  }
}
