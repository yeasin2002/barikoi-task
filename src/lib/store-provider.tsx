'use client'

import { Provider } from 'react-redux'
import { useState, type ReactNode } from 'react'
import { makeStore } from '@/lib/store'

type StoreProviderProps = {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(makeStore)

  return <Provider store={store}>{children}</Provider>
}
