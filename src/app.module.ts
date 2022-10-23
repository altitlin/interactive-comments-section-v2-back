import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { CommentsModule } from './features/comments'
import { UsersModule } from './features/users'
import { getMongoURI } from './utils'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.local' /*  TODO: should be define automatically */ }),
    MongooseModule.forRoot(getMongoURI(), {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'))
        return connection
      },
    }),
    CommentsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
