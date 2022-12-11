import { Test } from '@nestjs/testing'

import { UpdateCommentDto } from '../dtos/update-comment.dto'
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

  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should call the create method of the comment service', async () => {
      const createCommentDto = {
        content: commentStub().content,
        user: commentStub().user,
      }

      await commentsController.create(createCommentDto)

      expect(commentsService.create).toHaveBeenCalledWith(createCommentDto)
    })
  })

  describe('findAll', () => {
    it('should call the findAll method of the comment service', async () => {
      await commentsController.findAll()

      expect(commentsService.findAll).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('should call the update method of the comment service', async () => {
      const { id, ...rest } = commentStub()

      await commentsController.update(id, rest as unknown as UpdateCommentDto)

      expect(commentsService.update).toHaveBeenCalledWith(id, rest)
    })
  })

  describe('delete', () => {
    it('should call the delete method of the comments service', async () => {
      await commentsController.delete(commentStub().id)

      expect(commentsService.delete).toHaveBeenCalled()
    })
  })
})
