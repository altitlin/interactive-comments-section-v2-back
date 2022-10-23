import { PickType } from '@nestjs/swagger'

import { BasicComment } from './basic-comment.dto'

export class CreateCommentDto extends PickType(BasicComment, [ 'content', 'user' ]) {}
