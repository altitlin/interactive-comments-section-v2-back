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

  it('should be defined', () => {
    expect(commentsController).toBeDefined()
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
  })
})
