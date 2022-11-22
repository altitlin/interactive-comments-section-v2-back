import { commentStub } from '../__tests__/comment.stub'

export const mockCommentModel = {
  new: jest.fn().mockResolvedValue(commentStub()),
  constructor: jest.fn().mockResolvedValue(commentStub()),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  exec: jest.fn(),
}
