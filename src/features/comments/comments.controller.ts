import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  HttpException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'
import { isValidObjectId } from 'mongoose'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '../../core/constants'
import { HttpExceptionResponse } from '../../core/models'
import { ValidationObjectId } from '../../core/pipes'

import { CreateCommentDto } from './dtos/create-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { Comment } from './schemas/comment.schema'
import { isValidCreateCommentDto } from './comments.helpers'
import { CommentsService } from './comments.service'

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment for a current user' })
  @ApiCreatedResponse({ type: Comment })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      if (!isValidCreateCommentDto(createCommentDto)) {
        throw new BadRequestException(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidCreateCommentDto)
      }

      if (!isValidObjectId(createCommentDto.user)) {
        throw new BadRequestException(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidUserID)
      }

      const comment = await this.commentsService.create(createCommentDto)

      return comment
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get()
  @ApiOperation({ summary: 'Return all the comments of user' })
  @ApiOkResponse({ type: [ Comment ] })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async findAll(): Promise<Comment[]> {
    try {
      const comments = await this.commentsService.findAll()

      return comments
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment for a current user' })
  @ApiOkResponse({ type: Comment })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async update(@Param('id', ValidationObjectId) id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await this.commentsService.findOne(id)

      if (!comment) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
      }

      const res = await this.commentsService.update(id, updateCommentDto)

      return res
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment for a current user' })
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
      const comment = await this.commentsService.findOne(id)

      if (!comment) {
        throw new NotFoundException(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
      }

      const res = await this.commentsService.delete(id)

      return res
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
