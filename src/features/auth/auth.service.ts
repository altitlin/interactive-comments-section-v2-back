/* eslint-disable no-underscore-dangle */
import { Injectable, HttpException, ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as argon2 from 'argon2'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '@core/constants'
import { UsersService, CreateUserDto, User } from '@features/users'

import { AuthDto } from './dtos/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.usersService.findByUsername(createUserDto.username)

      if (userExists) {
        throw new ForbiddenException(ERROR_INTERNAL_CLASSS_MESSAGES.IncorrectCredentials)
      }

      const hash = await this.hashData(createUserDto.password)
      const user = await this.usersService.create({
        ...createUserDto,
        password: hash,
      })
      const tokens = await this.getTokens(user._id, user.username)

      await this.updateRefreshToken(user._id, tokens.refreshToken)

      return tokens
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async signIn(authDto: AuthDto) {
    try {
      const user = await this.usersService.findByUsername(authDto.username)

      if (!user) {
        throw new ForbiddenException(ERROR_INTERNAL_CLASSS_MESSAGES.IncorrectCredentials)
      }

      const passwordMatches = await argon2.verify(user.password, authDto.password)

      if (!passwordMatches) {
        throw new ForbiddenException(ERROR_INTERNAL_CLASSS_MESSAGES.IncorrectCredentials)
      }

      const tokens = await this.getTokens(user._id, user.username)

      await this.updateRefreshToken(user._id, tokens.refreshToken)

      return tokens
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async logout(userId: string): Promise<User> {
    try {
      const user = await this.usersService.update(userId, { refreshToken: null })

      return user
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    try {
      const user = await this.usersService.findOne(userId)

      if (!user || !user.refreshToken) {
        throw new ForbiddenException(ERROR_INTERNAL_CLASSS_MESSAGES.IncorrectCredentials)
      }

      const refreshTokenMatches = await argon2.verify(
        user.refreshToken,
        refreshToken
      )

      if (!refreshTokenMatches) {
        throw new ForbiddenException(ERROR_INTERNAL_CLASSS_MESSAGES.IncorrectCredentials)
      }

      const tokens = await this.getTokens(user._id, user.username)

      await this.updateRefreshToken(user._id, tokens.refreshToken)

      return tokens
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    try {
      const hashedRefreshToken = await this.hashData(refreshToken)

      await this.usersService.update(userId, { refreshToken: hashedRefreshToken })
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async getTokens(userId: string, username: string) {
    const jwtPayload = {
      sub: userId,
      username,
    }

    const [ accessToken, refreshToken ] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  // eslint-disable-next-line class-methods-use-this
  hashData(data: string) {
    return argon2.hash(data)
  }
}
