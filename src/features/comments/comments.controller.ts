import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { TagsNamesSwagger } from '@core/constants'
import { HttpExceptionResponse } from '@core/models'
import { ValidationObjectId } from '@core/pipes'
import { AccessTokenGuard } from '@core/guards'

import { CreateCommentDto } from './dtos/create-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { Comment } from './schemas/comment.schema'
import { CommentsService } from './comments.service'

@ApiBearerAuth()
@ApiTags(TagsNamesSwagger.COMMENTS)
@UseGuards(AccessTokenGuard)
@Controller(TagsNamesSwagger.COMMENTS)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment for a current user' })
  @ApiCreatedResponse({ type: Comment })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentsService.create(createCommentDto)

    return comment
  }

  @Get()
  @ApiOperation({ summary: 'Return all the comments of user' })
  @ApiOkResponse({ type: [ Comment ] })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async findAll(): Promise<Comment[]> {
    const comments = await this.commentsService.findAll()

    return comments
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment for a current user' })
  @ApiOkResponse({ type: Comment })
  @ApiBadRequestResponse({ description: 'Bad request', type: HttpExceptionResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: HttpExceptionResponse })
  @ApiNotFoundResponse({ description: 'Not Found', type: HttpExceptionResponse })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: HttpExceptionResponse,
  })
  async update(@Param('id', ValidationObjectId) id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentsService.update(id, updateCommentDto)

    return comment
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment for a current user' })
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
    await this.commentsService.delete(id)
  }
}
