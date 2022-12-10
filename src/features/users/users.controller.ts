import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'

import { HttpExceptionResponse } from '@core/models'
import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'
import { ValidationObjectId } from '@core/pipes'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const isUserExists = await this.usersService.findByUsername(createUserDto.username)

      if (isUserExists) {
        throw new BadRequestException(ERROR_INTERNAL_CLASSS_MESSAGES.ExistsUser)
      }

      const user = await this.usersService.create(createUserDto)

      return user
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return current user by id' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async findOne(@Param('id', ValidationObjectId) id: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(id)

      if (!user) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
      }

      return user
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async update(@Param('id', ValidationObjectId) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersService.findOne(id)

      if (!user) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
      }

      const res = await this.usersService.update(id, updateUserDto)

      return res
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async delete(@Param('id', ValidationObjectId) id: string): Promise<void> {
    try {
      const comment = await this.usersService.findOne(id)

      if (!comment) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
      }

      const res = await this.usersService.delete(id)

      return res
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
