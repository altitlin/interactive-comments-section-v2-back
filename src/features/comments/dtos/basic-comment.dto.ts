import {
  IsNotEmpty,
  IsMongoId,
  IsString,
  IsNumber,
  IsPositive
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BasicComment {
  @ApiProperty({
    type: String,
    example: '6348528912bc342cb3fbc0fe',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string

  @ApiProperty({
    type: String,
    example: 'Just some content',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string

  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly score: number

  @ApiProperty({
    type: String,
    example: '6348528912bc342cb3fbc0fe',
  })
  readonly user: string
}
