import { Controller, Get } from '@nestjs/common'

import { Comment } from './schemas/comment.schema'
import { CommentsService } from './comments.service'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll()
  }
}
