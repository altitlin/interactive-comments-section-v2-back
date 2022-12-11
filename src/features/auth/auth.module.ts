import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from '@features/users'

import { AccessTokenStrategy } from './strategies/access-token.strategy'
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [ JwtModule.register({}), UsersModule, ConfigModule ],
  controllers: [ AuthController ],
  providers: [ AuthService, AccessTokenStrategy, RefreshTokenStrategy ],
})
export class AuthModule {}
