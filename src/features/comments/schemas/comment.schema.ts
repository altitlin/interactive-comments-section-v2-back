import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

import { User } from '../../users'

export type CommentDocument = Comment & mongoose.Document

@Schema()
export class Comment {
  @Prop({ type: String, required: true })
  content: string

  @Prop({ type: Number, required: true })
  score: number

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  user: User

  @Prop(raw({
    id: { type: String, required: true },
    content: { type: String, required: true },
    score: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    replyingTo: { type: String, required: true },
  }))
  replies: Array<Record<string, any>>
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
