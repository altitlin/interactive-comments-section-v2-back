import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { HttpExceptionResponse } from '@core/models'
import { TagsNamesSwagger } from '@core/constants'
import { AccessTokenGuard, RefreshTokenGuard } from '@core/guards'
import { CreateUserDto, User, GetUser } from '@features/users'

import { AuthDto } from './dtos/auth.dto'
import { AuthService } from './auth.service'

@ApiBearerAuth()
@ApiTags(TagsNamesSwagger.AUTH)
@Controller(TagsNamesSwagger.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiForbiddenResponse({ description: 'Forbidden', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const tokens = await this.authService.signUp(createUserDto)

    return tokens
  }

  @Post('signin')
  @ApiOperation({ summary: 'Login an exising user' })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiForbiddenResponse({ description: 'Forbidden', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async signIn(@Body() authDto: AuthDto) {
    const tokens = await this.authService.signIn(authDto)

    return tokens
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiOperation({ summary: 'Logout an exising user' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async logout(@GetUser('sub') sub: string) {
    const user = await this.authService.logout(sub)

    return user
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh token for an existing user' })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async refreshTokens(@GetUser('sub') sub: string, @GetUser('refreshToken') refreshToken: string) {
    const tokens = await this.authService.refreshTokens(sub, refreshToken)

    return tokens
  }
}
