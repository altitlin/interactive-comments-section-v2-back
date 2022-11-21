import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'
import helmet from 'helmet'

import { corsOptions } from './core/config/cors'
import { HttpExceptionFilter } from './core/filters/http-exception.filter'
import { initSwagger } from './core/lib/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors(corsOptions)
  app.setGlobalPrefix(process.env.API_PREFIX)

  app.use(compression())
  app.use(helmet())

  initSwagger(app)

  await app.listen(process.env.PORT)
}

bootstrap()
