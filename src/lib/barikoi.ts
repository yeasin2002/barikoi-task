import { createBarikoiClient } from 'barikoiapis'

export const barikoi = createBarikoiClient({
  apiKey: process.env.BARIKOI_API_KEY!,
  timeout: 10000,
})
