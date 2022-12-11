import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
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
  readonly password: string
}
