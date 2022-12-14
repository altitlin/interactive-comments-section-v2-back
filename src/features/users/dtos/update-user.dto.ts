import { PartialType } from '@nestjs/swagger'

import { User } from '../schemas/user.schema'

export class UpdateUserDto extends PartialType(User) {}
