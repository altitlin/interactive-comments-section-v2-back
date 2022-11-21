import { PartialType } from '@nestjs/swagger'

import { Comment } from '../schemas/comment.schema'

export class UpdateCommentDto extends PartialType(Comment) {}
