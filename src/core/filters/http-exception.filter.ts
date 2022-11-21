/* eslint-disable class-methods-use-this */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse()
    const { url, method } = ctx.getRequest()

    let status: HttpStatus
    let errorMessage: string

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse()

      status = exception.getStatus()
      errorMessage = (errorResponse as { error: string }).error || exception.message
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      errorMessage = 'Internal server error'
    }

    const responseBody = {
      statusCode: status,
      path: url,
      method,
      message: errorMessage,
    }

    response.status(status).json(responseBody)
  }
}
