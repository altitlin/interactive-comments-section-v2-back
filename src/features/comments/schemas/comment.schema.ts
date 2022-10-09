import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../../users'

import { ReplyComment } from '../entities/reply-comment.entity'

export type CommentDocument = Comment & mongoose.Document

@Schema({ timestamps: true })
export class Comment {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  content: string

  @ApiProperty({ type: Number, minimum: 0, default: 0 })
  @Prop({ type: Number, required: true, default: 0, min: 0 })
  score: number

  @ApiProperty({ type: User })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  user: mongoose.Schema.Types.ObjectId

  @ApiProperty({
    type: ReplyComment,
    isArray: true,
  })
  @Prop({
    type: [{
      id: { type: String, required: true },
      content: { type: String, required: true },
      score: { type: Number, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      replyingTo: { type: String, required: true },
    }],
    default: [],
  })
  replies: ReplyComment[]
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
