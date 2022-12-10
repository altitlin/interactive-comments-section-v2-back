import { IsString, IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { PASSWORD } from '../users.constants'

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'username',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @Length(PASSWORD.minLength, PASSWORD.maxLength)
  readonly password: string
}
