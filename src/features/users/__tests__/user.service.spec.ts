import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model, sanitizeFilter } from 'mongoose'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'

import { mockUserModel } from '../__mocks__/user.model'
import { UserDocument } from '../schemas/user.schema'
import { UpdateUserDto } from '../dtos/update-user.dto'
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
    jest.restoreAllMocks()
  })

  describe('create', () => {
    it('should return a created user', async () => {
      jest.spyOn(userService, 'findByUsername').mockResolvedValueOnce(null)
      jest.spyOn(userModel, 'create').mockResolvedValueOnce(userStub() as never)

      const createUserDto = {
        username: userStub().username,
        password: userStub().password,
        refreshToken: userStub().refreshToken,
      }

      const user = await userService.create(createUserDto)
      const userCommentDto = {
        ...createUserDto,
        image: userStub().image,
      }

      expect(user).toEqual(userStub())
      expect(mockUserModel.create).toHaveBeenCalled()
      expect(mockUserModel.create).toHaveBeenCalledWith(userCommentDto)
    })
  })

  describe('findOne', () => {
    it('should return an existing user by id', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userStub() as never)

      const user = await userService.findOne(userStub().id)

      expect(user).toEqual(userStub())
      expect(mockUserModel.findOne).toHaveBeenCalled()
      expect(mockUserModel.findOne)
        .toHaveBeenCalledWith({ _id: { $eq: userStub().id } })
    })
  })

  describe('findByUsername', () => {
    it('should return an existing user by username', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userStub() as never)

      const user = await userService.findByUsername(userStub().username)

      expect(user).toEqual(userStub())
      expect(mockUserModel.findOne).toHaveBeenCalled()
      expect(mockUserModel.findOne)
        .toHaveBeenCalledWith({ username: { $eq: userStub().username } })
    })
  })

  describe('update', () => {
    it('should throw the bad request exception if the user does not exist with the passing id', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null)

      const { id, ...rest } = userStub()
      const updateUserDto = { id, ...rest } as unknown as UpdateUserDto

      await expect(userService.update(id, updateUserDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
    })

    it('should return the updated user', async () => {
      jest.spyOn(userService, 'findOne')
        .mockResolvedValueOnce(userStub())
        .mockResolvedValueOnce(userStub())
      jest.spyOn(userModel, 'updateOne').mockResolvedValueOnce(userStub() as never)

      const { id, ...rest } = userStub()
      const updateUserDto = { id, ...rest } as unknown as UpdateUserDto
      const user = await userService.update(id, updateUserDto)

      expect(user).toEqual(userStub())
      expect(mockUserModel.updateOne).toHaveBeenCalled()
      expect(mockUserModel.updateOne)
        .toHaveBeenCalledWith(
          { _id: { $eq: userStub().id } },
          { $set: sanitizeFilter(updateUserDto) }
        )
    })
  })

  describe('delete', () => {
    it('should throw the bad request exception if the user does not exist with the passing id', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null)

      await expect(userService.delete(userStub().id))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
    })

    it('should delete an existing user by id', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(userStub())
      jest.spyOn(userModel, 'deleteOne').mockResolvedValueOnce(userStub().id as never)

      await userService.delete(userStub().id)

      expect(mockUserModel.deleteOne).toHaveBeenCalled()
      expect(mockUserModel.deleteOne)
      .toHaveBeenCalledWith({ _id: { $eq: userStub().id } })
    })
  })
})
