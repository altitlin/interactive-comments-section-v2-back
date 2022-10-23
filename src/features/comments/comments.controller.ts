import {
  Controller,
  Body,
  Get,
  Post
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

import { CreateCommentDto } from './dtos/create-comment.dto'
import { BadRequestCreatingComment } from './dtos/bad-request-creating-comment.dto'
import { Comment } from './schemas/comment.schema'
import { CommentsService } from './comments.service'

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Return all the comments of user' })
  @ApiOkResponse({ type: [ Comment ] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new comment for a current user' })
  @ApiCreatedResponse({ type: Comment })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadRequestCreatingComment,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto)
  }
}
