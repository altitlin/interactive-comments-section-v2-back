import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { CommentsModule } from './features/comments'
import { UsersModule } from './features/users'
import { getMongoURI } from './utils'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getMongoURI()),
    CommentsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
