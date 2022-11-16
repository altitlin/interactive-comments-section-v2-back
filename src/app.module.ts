import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { CommentsModule } from './features/comments'
import { UsersModule } from './features/users'
import { getMongoURI, getEnvFilePath } from './core/utils'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: getEnvFilePath() }),
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
