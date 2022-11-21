import { Test } from '@nestjs/testing'

import { CommentsService } from '../comments.service'
import { CommentsController } from '../comments.controller'

import { commentStub } from './comment.stub'

jest.mock('../comments.service')

describe('CommentsController', () => {
  let commentsController: CommentsController
  let commentsService: CommentsService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ CommentsController ],
      providers: [ CommentsService ],
    }).compile()

    commentsController = moduleRef.get<CommentsController>(CommentsController)
    commentsService = moduleRef.get<CommentsService>(CommentsService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    let comment
    let createCommentDto

    beforeEach(async () => {
      createCommentDto = {
        content: commentStub().content,
        user: commentStub().user,
      }
      comment = await commentsController.create(createCommentDto)
    })

    it('should call the comments service', () => {
      expect(commentsService.create).toHaveBeenCalledWith(createCommentDto)
    })

    it('should create a comment for current user', () => {
      expect(comment).toEqual(commentStub())
    })

    it('should throw exception if content or user should not be provided', async () => {
      const expectedMessageException = 'Content or user should be provided'

      await expect(commentsController.create({
        content: '',
        user: '',
      })).rejects.toThrowError(expectedMessageException)
    })

    it('should throw exception if user id was passed incorrectly', async () => {
      const expectedMessageException = 'Invalid user id'

      await expect(commentsController.create({
        content: 'content',
        user: '1234',
      })).rejects.toThrowError(expectedMessageException)
    })
  })

  describe('findAll', () => {
    let comments

    beforeEach(async () => {
      comments = await commentsController.findAll()
    })

    it('should call the comments service', () => {
      expect(commentsService.findAll).toHaveBeenCalled()
    })

    it('should return an array of comments for current user', async () => {
      expect(comments).toEqual([ commentStub() ])
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await commentsController.delete(commentStub().id)
    })

    it('should call the comments service', () => {
      expect(commentsService.delete).toHaveBeenCalled()
    })

    it('should throw exception if comment id was passed incorrectly', async () => {
      const expectedMessageException = 'Invalid comment id'

      await expect(commentsController.delete('1234'))
        .rejects
        .toThrowError(expectedMessageException)
    })

    it('should throw exception if comment was not found by id', async () => {
      jest.spyOn(commentsService, 'findOne').mockResolvedValue(null)

      const expectedMessageException = `Comment not found by id: ${commentStub().id}`

      await expect(commentsController.delete(commentStub().id))
        .rejects
        .toThrowError(expectedMessageException)
    })
  })
})
