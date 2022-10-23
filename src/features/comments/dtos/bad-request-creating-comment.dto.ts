import { ApiProperty } from '@nestjs/swagger'

export class BadRequestCreatingComment {
  @ApiProperty({
    type: Number,
    example: 400,
  })
  statusCode: number

  @ApiProperty({
    type: [ String ],
    example: [ 'user should not be empty' ],
  })
  message: string[]

  @ApiProperty({
    type: String,
    example: 'Bad Request',
  })
  error: string
}
