import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  image: string

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  username: string
}

export const UserSchema = SchemaFactory.createForClass(User)
