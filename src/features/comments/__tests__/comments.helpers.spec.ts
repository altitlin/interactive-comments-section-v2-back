import { CreateCommentDto } from '../dtos/create-comment.dto'
import { isValidCreateCommentDto } from '../comments.helpers'

import { commentStub } from './comment.stub'

describe('Comments helpers', () => {
  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('isValidCreateCommentDto', () => {
    it('should return "false" if the user/content property of the create comment dto was not passed', () => {
      expect(isValidCreateCommentDto({ user: '', content: '' })).toBeFalsy()
      expect(isValidCreateCommentDto({ user: '', content: 'content' })).toBeFalsy()
      expect(isValidCreateCommentDto({ user: 'user id', content: '' })).toBeFalsy()
    })

    it('should return "true" if the create comment dto was passed correctly', () => {
      const createCommentDto: CreateCommentDto = {
        user: commentStub().user,
        content: commentStub().content,
      }

      expect(isValidCreateCommentDto(createCommentDto)).toBeTruthy()
    })
  })
})
