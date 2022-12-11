import { Test } from '@nestjs/testing'

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
    it('should call the create method of the users service', async () => {
      const createUserDto = {
        username: userStub().username,
        password: userStub().password,
        refreshToken: userStub().refreshToken,
      }

      await usersController.create(createUserDto)

      expect(usersService.create).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('findOne', () => {
    it('should call the findOne method of the users service', async () => {
      await usersController.findOne(userStub().id)

      expect(usersService.findOne).toHaveBeenCalledWith(userStub().id)
    })
  })

  describe('update', () => {
    it('should call the users service', async () => {
      const { id, ...rest } = userStub()

      await usersController.update(id, rest)

      expect(usersService.update).toHaveBeenCalledWith(id, rest)
    })
  })

  describe('delete', () => {
    it('should call the users service', async () => {
      await usersController.delete(userStub().id)

      expect(usersService.delete).toHaveBeenCalled()
    })
  })
})
