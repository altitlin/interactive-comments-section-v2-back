import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model, sanitizeFilter } from 'mongoose'

import { mockCommentModel } from '../__mocks__/comment.model'
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

  describe('create', () => {
    let comment
    let createCommentDto

    beforeEach(async () => {
      jest.spyOn(commentModel, 'create').mockResolvedValueOnce(commentStub() as never)
      createCommentDto = {
        content: commentStub().content,
        user: commentStub().user,
      }
      comment = await commentService.create(createCommentDto)
    })

    it('should call the "create" method of the comment model', () => {
      expect(mockCommentModel.create).toHaveBeenCalled()
      expect(mockCommentModel.create).toHaveBeenCalledWith({
        ...createCommentDto,
        score: 0,
        replies: [],
      })
    })

    it('should return a created comment for current user', () => {
      expect(comment).toEqual(commentStub())
    })
  })

  describe('findAll', () => {
    let comments

    beforeEach(async () => {
      jest.spyOn(commentModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue([ commentStub() ]),
      } as any)
      comments = await commentService.findAll()
    })

    it('should call the "find" method of the comment model', () => {
      expect(mockCommentModel.find).toHaveBeenCalled()
    })

    it('should return an array of comments for current user', () => {
      expect(comments).toEqual([ commentStub() ])
    })
  })

  describe('findOne', () => {
    let comment

    beforeEach(async () => {
      jest.spyOn(commentModel, 'findOne').mockResolvedValueOnce(commentStub() as never)
      comment = await commentService.findOne(commentStub().id)
    })

    it('should call the "findOne" method of the comment model', () => {
      expect(mockCommentModel.findOne).toHaveBeenCalled()
      expect(mockCommentModel.findOne)
        .toHaveBeenCalledWith({ _id: { $eq: commentStub().id } })
    })

    it('should return the comment for current user', () => {
      expect(comment).toEqual(commentStub())
    })
  })

  describe('update', () => {
    let comment
    let updateCommentDto

    beforeEach(async () => {
      jest.spyOn(commentModel, 'updateOne').mockResolvedValueOnce({} as never)
      jest.spyOn(commentModel, 'findOne').mockResolvedValueOnce(commentStub() as never)
      updateCommentDto = {
        content: commentStub().content,
        user: commentStub().user,
        score: commentStub().score,
        replies: commentStub().replies,
      }
      comment = await commentService.update(commentStub().id, updateCommentDto)
    })

    it('should call the "updateOne" method of the comment model', () => {
      expect(mockCommentModel.updateOne).toHaveBeenCalled()
      expect(mockCommentModel.updateOne)
        .toHaveBeenCalledWith(
          { _id: { $eq: commentStub().id } },
          { $set: sanitizeFilter(updateCommentDto) }
        )
    })

    it('should return the updated comment for current user', () => {
      expect(comment).toEqual(commentStub())
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      jest.spyOn(commentModel, 'deleteOne').mockResolvedValueOnce(commentStub().id as never)
      await commentService.delete(commentStub().id)
    })

    it('should call the "deleteOne" method of the comment model', () => {
      expect(mockCommentModel.deleteOne).toHaveBeenCalled()
      expect(mockCommentModel.deleteOne)
      .toHaveBeenCalledWith({ _id: { $eq: commentStub().id } })
    })
  })
})
