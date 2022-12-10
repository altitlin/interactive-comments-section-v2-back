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
  @ApiProperty({
    type: String,
    example: '/images/image-ramsesmiron.png',
  })
  image: string

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  @ApiProperty({
    type: String,
    example: 'ramsesmiron',
  })
  username: string
}

export const UserSchema = SchemaFactory.createForClass(User)
