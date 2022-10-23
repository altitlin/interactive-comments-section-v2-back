import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions
} from '@nestjs/swagger'
import * as compression from 'compression'
import helmet from 'helmet'

import { corsOptions } from './config/cors'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors(corsOptions)
  app.setGlobalPrefix(process.env.API_PREFIX)

  app.use(compression())
  app.use(helmet())

  const config = new DocumentBuilder()
    .setTitle('The interactive comments section API Docs')
    .setVersion('1.0.0')
    .addTag('comments')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup(process.env.API_PREFIX, app, document)

  await app.listen(process.env.PORT)
}

bootstrap()
