import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'

export function getParsedLocalStorage<T extends z.ZodTypeAny>(key: string, schema: T): z.infer<T> | undefined {
  const raw = localStorage.getItem(key)
  if (!raw) return
  try {
    const json = JSON.parse(raw)
    const parsed = schema.safeParse(json)

    return parsed.success ? parsed.data : undefined
  } catch (e) {
    console.error(e)
  }
}

export function useGetLocalStorage<T extends z.ZodTypeAny>(key: string, schema: T): z.infer<T> | undefined {
  return useMemo(() => {
    return getParsedLocalStorage(key, schema)
  }, [key, schema])
}

export function useSaveLocalStorage(key: string, value: unknown) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
}

export function useLocalStorageState<T extends z.ZodTypeAny>(key: string, schema: T, fallbackValue: z.infer<T>) {
  const initialValue = useGetLocalStorage(key, schema)
  const [state, setState] = useState(initialValue ?? fallbackValue)
  useSaveLocalStorage(key, state)
  return [state, setState] as const
}
