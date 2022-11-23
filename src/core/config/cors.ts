import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

export const corsOptions: CorsOptions = {
  origin: process.env.FRONT_URL ?? 'https://localhost:4242',
  methods: [ 'GET', 'POST', 'PATCH', 'DELETE' ],
  allowedHeaders: [ 'Content-Type' ],
}
