import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Delete,
  HttpException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException
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

import { HttpExceptionResponse } from '../../core/models/http-exception-response.class'
import { isValidObjectId } from '../../core/utils'

import { CreateCommentDto } from './dtos/create-comment.dto'
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
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment | HttpException> {
    try {
      if (!isValidCreateCommentDto(createCommentDto)) {
        throw new BadRequestException('Content or user should be provided')
      }

      if (!isValidObjectId(createCommentDto.user)) {
        throw new BadRequestException('Invalid user id')
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
  @ApiBadRequestResponse({ description: 'Bad request', type: () => HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async findAll(): Promise<Comment[] | HttpException> {
    try {
      const comments = await this.commentsService.findAll()

      return comments
    } catch (error) {
      throw new InternalServerErrorException()
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
  async delete(@Param('id') id: string): Promise<void> {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid comment id')
      }

      const comment = await this.commentsService.findOne(id)

      if (!comment) {
        throw new NotFoundException(`Comment not found by id: ${id}`)
      }

      const res = await this.commentsService.delete(id)

      return res
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
