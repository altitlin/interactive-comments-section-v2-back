import { ApiProperty } from '@nestjs/swagger'

import { User } from '../../users'

export class ReplyComment {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String })
  content: string

  @ApiProperty({ type: Number })
  score: number

  @ApiProperty({ type: User })
  user: User

  @ApiProperty({ type: String })
  replyingTo: string
}
