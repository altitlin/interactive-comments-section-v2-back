import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
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
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { HttpExceptionResponse } from '@core/models'
import { TagsNamesSwagger } from '@core/constants'
import { ValidationObjectId } from '@core/pipes'
import { AccessTokenGuard } from '@core/guards'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

@ApiBearerAuth()
@ApiTags(TagsNamesSwagger.USERS)
@UseGuards(AccessTokenGuard)
@Controller(TagsNamesSwagger.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto)

    return user
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return current user by id' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async findOne(@Param('id', ValidationObjectId) id: string): Promise<User> {
    const user = await this.usersService.findOne(id)

    return user
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async update(@Param('id', ValidationObjectId) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersService.update(id, updateUserDto)

    return user
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async delete(@Param('id', ValidationObjectId) id: string): Promise<void> {
    await this.usersService.delete(id)
  }
}