import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { BasicComment } from './basic-comment.dto'

export class ReplyComment extends BasicComment {
  @ApiProperty({
    type: String,
    example: 'ramsesmiron',
  })
  @IsNotEmpty()
  @IsString()
  readonly replyingTo: string
}
