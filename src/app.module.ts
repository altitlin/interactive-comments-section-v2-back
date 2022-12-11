import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { getMongoURI, getEnvFilePath } from '@core/utils'
import { CommentsModule } from '@features/comments'
import { UsersModule } from '@features/users'
import { AuthModule } from '@features/auth'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: getEnvFilePath() }),
    MongooseModule.forRoot(getMongoURI(), {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'))
        return connection
      },
    }),
    AuthModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
