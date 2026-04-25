import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    BARIKOI_API_KEY: z.string().min(1),
    ANALYZE: z.string().optional(),
    CI: z.string().optional(),
    SKIP_ENV_VALIDATION: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_BARIKOI_MAP_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BARIKOI_API_KEY: process.env.BARIKOI_API_KEY,
    NEXT_PUBLIC_BARIKOI_MAP_KEY: process.env.NEXT_PUBLIC_BARIKOI_MAP_KEY,
    ANALYZE: process.env.ANALYZE,
    CI: process.env.CI,
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
