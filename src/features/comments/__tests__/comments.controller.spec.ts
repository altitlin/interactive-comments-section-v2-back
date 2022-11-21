import { Test } from '@nestjs/testing'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '../../../core/constants'

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

    it('should throw the bad request exception if content or user should not be provided', async () => {
      const incorrectCreateCommentDto = {
        content: '',
        user: '',
      }

      await expect(commentsController.create(incorrectCreateCommentDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidCreateCommentDto)
    })

    it('should throw the bad request exception if user id was passed incorrectly', async () => {
      const incorrectCreateCommentDto = {
        content: 'content',
        user: '1234',
      }

      await expect(commentsController.create(incorrectCreateCommentDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidUserID)
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

  describe('update', () => {
    let comment
    let updateCommentDto

    beforeEach(async () => {
      updateCommentDto = {
        content: commentStub().content,
        score: commentStub().score,
        user: commentStub().user,
      }
      comment = await commentsController.update(commentStub().id, updateCommentDto)
    })

    it('should call the comments service', () => {
      expect(commentsService.update).toHaveBeenCalledWith(commentStub().id, updateCommentDto)
    })

    it('should update a comment for current user', () => {
      expect(comment).toEqual(commentStub())
    })

    it('should throw the not found exception if comment was not found by id', async () => {
      jest.spyOn(commentsService, 'findOne').mockResolvedValueOnce(null)

      await expect(commentsController.update(commentStub().id, updateCommentDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await commentsController.delete(commentStub().id)
    })

    it('should call the comments service', () => {
      expect(commentsService.delete).toHaveBeenCalled()
    })

    it('should throw the not found exception if comment was not found by id', async () => {
      jest.spyOn(commentsService, 'findOne').mockResolvedValueOnce(null)

      await expect(commentsController.delete(commentStub().id))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
    })
  })
})
