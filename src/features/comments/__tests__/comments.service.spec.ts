import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model } from 'mongoose'

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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(commentService).toBeDefined()
  })

  describe('findAll', () => {
    let comments

    beforeEach(async () => {
      jest.spyOn(commentModel, 'find').mockReturnValue({
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

  describe('create', () => {
    let comment
    let createCommentDto

    beforeEach(async () => {
      jest.spyOn(commentModel, 'create').mockResolvedValue(commentStub() as never)
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
})
