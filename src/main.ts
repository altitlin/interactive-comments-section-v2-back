import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('The interactive comments section API Docs')
    .setVersion('1.0.0')
    .addTag('comments')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
