import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model, sanitizeFilter } from 'mongoose'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'

import { mockCommentModel } from '../__mocks__/comment.model'
import { UpdateCommentDto } from '../dtos/update-comment.dto'
import { CommentDocument } from '../schemas/comment.schema'
import { CommentsService } from '../comments.service'

import { commentStub } from './comment.stub'

describe('CommentsService', () => {
  let commentService: CommentsService
  let commentModel: Model<CommentDocument>

  beforeEach(async () => {
    const modelToken = getModelToken('Comment')
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: modelToken,
          useValue: mockCommentModel,
        },
      ],
    }).compile()

    commentService = moduleRef.get<CommentsService>(CommentsService)
    commentModel = moduleRef.get<Model<CommentDocument>>(modelToken)
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  describe('create', () => {
    it('should throw the bad request exception if content or user should not be provided', async () => {
      const invalidCreateCommentDto = {
        content: '',
        user: '',
      }

      await expect(commentService.create(invalidCreateCommentDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidCreateCommentDto)
    })

    it('should throw the bad request exception if id of the user was passed incorrectly', async () => {
      const invalidCreateCommentDto = {
        content: 'content',
        user: '42',
      }

      await expect(commentService.create(invalidCreateCommentDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidUserID)
    })

    it('should return a created comment for current user', async () => {
      jest.spyOn(commentModel, 'create').mockResolvedValueOnce(commentStub() as never)

      const { content, user } = commentStub()
      const createCommentDto = { content, user }
      const comment = await commentService.create(createCommentDto)

      expect(comment).toEqual(commentStub())
      expect(mockCommentModel.create).toHaveBeenCalled()
      expect(mockCommentModel.create).toHaveBeenCalledWith({
        ...createCommentDto,
        score: 0,
        replies: [],
      })
    })
  })

  describe('findAll', () => {
    it('should return an array of comments for current user', async () => {
      jest.spyOn(commentModel, 'find').mockResolvedValue([ commentStub() ])

      const comments = await commentService.findAll()

      expect(comments).toEqual([ commentStub() ])
      expect(mockCommentModel.find).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should throw the bad request exception if the comment does not exist with the passing id', async () => {
      await expect(commentService.findOne(commentStub().id))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
    })

    it('should return an exising comment by id for current user', async () => {
      jest.spyOn(commentModel, 'findOne').mockResolvedValueOnce(commentStub() as never)

      const comment = await commentService.findOne(commentStub().id)

      expect(comment).toEqual(commentStub())
      expect(mockCommentModel.findOne).toHaveBeenCalled()
      expect(mockCommentModel.findOne)
        .toHaveBeenCalledWith({ _id: { $eq: commentStub().id } })
    })
  })

  describe('update', () => {
    it('should throw the bad request exception if the comment does not exist with the passing id', async () => {
      jest.spyOn(commentService, 'findOne').mockResolvedValueOnce(null)

      const { id, ...rest } = commentStub()
      const updateCommentDto = { id, ...rest } as unknown as UpdateCommentDto

      await expect(commentService.update(id, updateCommentDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
    })

    it('should update an exising comment for current user', async () => {
      jest.spyOn(commentService, 'findOne')
        .mockResolvedValueOnce(commentStub() as never)
        .mockResolvedValueOnce(commentStub() as never)
      jest.spyOn(commentModel, 'updateOne').mockResolvedValueOnce(commentStub() as never)

      const { id, ...rest } = commentStub()
      const updateCommentDto = { id, ...rest } as unknown as UpdateCommentDto
      const comment = await commentService.update(id, updateCommentDto)

      expect(comment).toEqual(commentStub())
      expect(mockCommentModel.updateOne).toHaveBeenCalled()
      expect(mockCommentModel.updateOne)
        .toHaveBeenCalledWith(
          { _id: { $eq: commentStub().id } },
          { $set: sanitizeFilter(updateCommentDto) }
        )
    })
  })

  describe('delete', () => {
    it('should throw the bad request exception if the comment does not exist with the passing id', async () => {
      jest.spyOn(commentService, 'findOne').mockResolvedValueOnce(null)

      await expect(commentService.delete(commentStub().id))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundComment)
    })

    it('should delete an exising comment by id', async () => {
      jest.spyOn(commentService, 'findOne').mockResolvedValueOnce(commentStub() as never)
      jest.spyOn(commentModel, 'deleteOne').mockResolvedValueOnce(commentStub().id as never)

      await commentService.delete(commentStub().id)

      expect(mockCommentModel.deleteOne).toHaveBeenCalled()
      expect(mockCommentModel.deleteOne)
      .toHaveBeenCalledWith({ _id: { $eq: commentStub().id } })
    })
  })
})
