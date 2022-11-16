import { INestApplication } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions
} from '@nestjs/swagger'

import { TagsNamesSwagger } from '../constants'

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('The interactive comments section API Docs')
    .setVersion('1.0.0')
    .addTag(TagsNamesSwagger.COMMENTS)
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup(process.env.API_PREFIX, app, document)
}
