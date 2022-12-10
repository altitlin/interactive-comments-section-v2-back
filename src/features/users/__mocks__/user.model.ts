import { userStub } from '../__tests__/user.stub'

export const mockUserModel = {
  new: jest.fn().mockResolvedValue(userStub()),
  constructor: jest.fn().mockResolvedValue(userStub()),
  create: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
}
