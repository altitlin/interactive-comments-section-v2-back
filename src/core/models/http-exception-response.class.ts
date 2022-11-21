import { ApiProperty } from '@nestjs/swagger'

export class HttpExceptionResponse {
  @ApiProperty({
    type: Number,
    example: 400,
  })
  statusCode: number

  @ApiProperty({
    type: String,
    example: '/api/v1/comments',
  })
  path: string

  @ApiProperty({
    type: String,
    example: 'POST',
  })
  method: string

  @ApiProperty({
    type: String,
    example: 'Some message',
  })
  message: string
}
