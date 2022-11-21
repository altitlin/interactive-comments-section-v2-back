import { CreateCommentDto } from './dtos/create-comment.dto'

export const isValidCreateCommentDto = (createCommentDto: CreateCommentDto): boolean => (
  !!(createCommentDto.user && createCommentDto.content)
)
