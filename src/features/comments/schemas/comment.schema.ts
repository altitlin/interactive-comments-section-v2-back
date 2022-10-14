import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../../users'

import { ReplyComment } from '../entities/reply-comment.entity'

export type CommentDocument = Comment & mongoose.Document

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({ type: String })
  content: string

  @Prop({
    type: Number,
    required: true,
    default: 0,
    min: 0,
  })
  @ApiProperty({
    type: Number,
    minimum: 0,
    default: 0,
  })
  score: number

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  @ApiProperty({ type: User })
  user: mongoose.Schema.Types.ObjectId

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        content: { type: String, required: true },
        score: { type: Number, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        replyingTo: { type: String, required: true },
      },
    ],
    default: [],
  })
  @ApiProperty({
    type: ReplyComment,
    isArray: true,
  })
  replies: ReplyComment[]
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
