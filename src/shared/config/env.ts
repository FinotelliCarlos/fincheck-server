import { plainToInstance } from "class-transformer"
import { IsString, IsNotEmpty, NotEquals, validateSync } from "class-validator"

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string

  @IsString()
  @IsNotEmpty()
  dbUrl: string
}

export const env: Env = plainToInstance(Env, {
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}