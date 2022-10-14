import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({ type: String })
  image: string

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({ type: String })
  username: string
}

export const UserSchema = SchemaFactory.createForClass(User)
