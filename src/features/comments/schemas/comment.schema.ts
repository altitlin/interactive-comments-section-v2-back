import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { ReplyComment } from '../dtos/reply-comment.dto'

export type CommentDocument = Comment & Document

@SchemaDecorator({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    type: String,
    example: 'Just some content',
  })
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  })
  @ApiProperty({
    type: String,
    example: '6348528912bc342cb3fbc0fe',
  })
  user: Schema.Types.ObjectId

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        content: { type: String, required: true },
        score: { type: Number, required: true },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          autopopulate: true,
        },
        replyingTo: { type: String, required: true },
      },
    ],
    default: [],
  })
  @ApiProperty({
    type: ReplyComment,
    isArray: true,
    example: [
      {
        id: '6348528912bc342cb3fbc0fe',
        content: 'Just some content',
        score: 0,
        user: {
          image: '/images/image-ramsesmiron.png',
          username: 'ramsesmiron',
        },
        replyingTo: 'ramsesmiron',
      },
    ],
  })
  replies: ReplyComment[]
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
