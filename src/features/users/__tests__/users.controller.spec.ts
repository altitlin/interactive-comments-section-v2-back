import { Test } from '@nestjs/testing'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'

import { UsersService } from '../users.service'
import { UsersController } from '../users.controller'

import { userStub } from './user.stub'

jest.mock('../users.service')

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ UsersController ],
      providers: [ UsersService ],
    }).compile()

    usersController = moduleRef.get<UsersController>(UsersController)
    usersService = moduleRef.get<UsersService>(UsersService)
  })

  afterAll(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('create', () => {
    let createUserDto

    beforeEach(async () => {
      createUserDto = {
        username: userStub().username,
        password: userStub().password,
      }
    })

    it('should call the users service', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValueOnce(null)

      await usersController.create(createUserDto)

      expect(usersService.create).toHaveBeenCalledWith(createUserDto)
    })

    it('should create a new user', async () => {
      jest.spyOn(usersService, 'findByUsername').mockResolvedValueOnce(null)

      const user = await usersController.create(createUserDto)

      expect(user).toEqual(userStub())
    })

    it('should throw the bad request exception if user exist with the same username', async () => {
      await expect(usersController.create(createUserDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.ExistsUser)
    })
  })

  describe('findOne', () => {
    let user

    beforeEach(async () => {
      user = await usersController.findOne(userStub().id)
    })

    it('should call the users service', async () => {
      expect(usersService.findOne).toHaveBeenCalledWith(userStub().id)
    })

    it('should return user by id', () => {
      expect(user).toEqual(userStub())
    })

    it('should throw the not found exception if user was not found by id', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(null)

      await expect(usersController.findOne(userStub().id))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
    })
  })

  describe('update', () => {
    let user
    let updateUserDto

    beforeEach(async () => {
      updateUserDto = {
        username: userStub().username,
        image: userStub().image,
      }
      user = await usersController.update(userStub().id, updateUserDto)
    })

    it('should call the users service', () => {
      expect(usersService.update).toHaveBeenCalledWith(userStub().id, updateUserDto)
    })

    it('should update an exising user', () => {
      expect(user).toEqual(userStub())
    })

    it('should throw the not found exception if user was not found by id', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(null)

      await expect(usersController.update(userStub().id, updateUserDto))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
    })
  })

  describe('delete', () => {
    beforeEach(async () => {
      await usersController.delete(userStub().id)
    })

    it('should call the users service', () => {
      expect(usersService.delete).toHaveBeenCalled()
    })

    it('should throw the not found exception if user was not found by id', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(null)

      await expect(usersController.delete(userStub().id))
        .rejects
        .toThrowError(ERROR_INTERNAL_CLASSS_MESSAGES.NotFoundUser)
    })
  })
})
