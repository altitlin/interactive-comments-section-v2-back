import { Controller, Get } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger'

import { Comment } from './schemas/comment.schema'
import { CommentsService } from './comments.service'

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Return all the comments of user' })
  @ApiOkResponse({
    type: [Comment]
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll()
  }
}
