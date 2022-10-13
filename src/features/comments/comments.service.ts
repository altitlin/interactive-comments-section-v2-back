import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Comment, CommentDocument } from './schemas/comment.schema'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel
      .find()
      .populate('user', 'image username')
      .populate('replies.user')
      .exec()
  }
}
