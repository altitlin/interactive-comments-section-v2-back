/* eslint-disable class-methods-use-this */
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  HttpException
} from '@nestjs/common'
import { isValidObjectId } from 'mongoose'

import { ERROR_INTERNAL_CLASSS_MESSAGES } from '../constants'

@Injectable()
export class ValidationObjectId implements PipeTransform {
  async transform(value: string) {
    try {
      if (!isValidObjectId(value)) {
        throw new BadRequestException(ERROR_INTERNAL_CLASSS_MESSAGES.InvalidObjectID)
      }

      return value
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
