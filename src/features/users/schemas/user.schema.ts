import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  image: string

  @Prop({ required: true })
  username: string
}

export const UserSchema = SchemaFactory.createForClass(User)
