import { commentStub } from '../__tests__/comment.stub'

export const CommentsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(commentStub()),
  findAll: jest.fn().mockResolvedValue([ commentStub() ]),
  findOne: jest.fn().mockResolvedValue(commentStub()),
  delete: jest.fn().mockResolvedValue(commentStub()),
})
