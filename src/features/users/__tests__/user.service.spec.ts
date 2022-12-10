import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model, sanitizeFilter } from 'mongoose'

import { mockUserModel } from '../__mocks__/user.model'
import { UserDocument } from '../schemas/user.schema'
import { UsersService } from '../users.service'

import { userStub } from './user.stub'

describe('UsersService', () => {
  let userService: UsersService
  let userModel: Model<UserDocument>

  beforeEach(async () => {
    const modelToken = getModelToken('User')
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: modelToken,
          useValue: mockUserModel,
        },
      ],
    }).compile()

    userService = moduleRef.get<UsersService>(UsersService)
    userModel = moduleRef.get<Model<UserDocument>>(modelToken)
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('create', () => {
    let user
    let userCommentDto

    beforeEach(async () => {
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(userStub() as never)
      userCommentDto = {
        image: userStub().image,
        username: userStub().username,
        password: userStub().password,
      }
      user = await userService.create(userCommentDto)
    })

    it('should call the "create" method of the user model', () => {
      expect(mockUserModel.create).toHaveBeenCalled()
      expect(mockUserModel.create).toHaveBeenCalledWith(userCommentDto)
    })

    it('should return a created user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('findOne', () => {
    let user

    beforeEach(async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userStub() as never)
      user = await userService.findOne(userStub().id)
    })

    it('should call the "findOne" method of the user model', () => {
      expect(mockUserModel.findOne).toHaveBeenCalled()
      expect(mockUserModel.findOne)
        .toHaveBeenCalledWith({ _id: { $eq: userStub().id } })
    })

    it('should return user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('', () => {
    let user

    beforeEach(async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userStub() as never)
      user = await userService.findByUsername(userStub().username)
    })

    it('should call the "findOne" method of the user model', () => {
      expect(mockUserModel.findOne).toHaveBeenCalled()
      expect(mockUserModel.findOne)
        .toHaveBeenCalledWith({ username: { $eq: userStub().username } })
    })

    it('should return user by username', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('update', () => {
    let user
    let updateUsertDto

    beforeEach(async () => {
      jest.spyOn(userModel, 'updateOne').mockResolvedValueOnce({} as never)
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userStub() as never)
      updateUsertDto = {
        image: userStub().image,
        username: userStub().username,
      }
      user = await userService.update(userStub().id, updateUsertDto)
    })

    it('should call the "updateOne" method of the user model', () => {
      expect(mockUserModel.updateOne).toHaveBeenCalled()
      expect(mockUserModel.updateOne)
        .toHaveBeenCalledWith(
          { _id: { $eq: userStub().id } },
          { $set: sanitizeFilter(updateUsertDto) }
        )
    })

    it('should return the updated user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      jest.spyOn(userModel, 'deleteOne').mockResolvedValueOnce(userStub().id as never)
      await userService.delete(userStub().id)
    })

    it('should call the "deleteOne" method of the user model', () => {
      expect(mockUserModel.deleteOne).toHaveBeenCalled()
      expect(mockUserModel.deleteOne)
      .toHaveBeenCalledWith({ _id: { $eq: userStub().id } })
    })
  })
})
