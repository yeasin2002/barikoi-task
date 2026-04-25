'use client'

import { makeStore } from '@/redux/store'
import { useState, type ReactNode } from 'react'
import { Provider } from 'react-redux'

type StoreProviderProps = {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(makeStore)

  return <Provider store={store}>{children}</Provider>
}
