import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { getMongoURI, getEnvFilePath } from '@core/utils'
import { CommentsModule } from '@features/comments'
import { UsersModule } from '@features/users'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: getEnvFilePath() }),
    MongooseModule.forRoot(getMongoURI(), {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'))
        return connection
      },
    }),
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
