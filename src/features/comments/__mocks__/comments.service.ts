import { commentStub } from '../__tests__/comment.stub'

export const CommentsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([ commentStub() ]),
  create: jest.fn().mockResolvedValue(commentStub()),
})
