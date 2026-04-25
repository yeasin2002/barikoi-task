import { createBarikoiClient } from 'barikoiapis'
import { env } from '@/env'

export const barikoi = createBarikoiClient({
  apiKey: env.BARIKOI_API_KEY,
  timeout: 10000,
})
