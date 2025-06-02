import { CFG } from '../env'
import { Auth } from './Auth'

export type APIResponse<T> = { status: 200, success: true, data: T } | { status: number, success: false }

export type APIBodyTypes = BodyInit | null | File | object
export async function apiRequest<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: APIBodyTypes,
): Promise<APIResponse<T>> {
  const headers: Headers = new Headers()

  const body = resolveBody(data, headers)
  if (Auth.isAuthed) {
    headers.append('key', Auth.key || '')
  }

  const res = await fetch(`${CFG.SERVER_URL}${path}`, { body, method, headers })
  if (res.status !== 200) {
    return {
      success: false,
      status: res.status,
    }
  }

  try {
    return {
      success: true,
      data: await res.json() as T,
      status: res.status,
    }
  }
  catch (e: unknown) {
    console.error(e)
    return {
      success: false,
      status: res.status,
    }
  }
}

function resolveBody(data: APIBodyTypes | undefined, headers: Headers): BodyInit | null | undefined {
  if (!data) return
  if (data instanceof File) {
    headers.append('Content-type', data.type)
    return data
  }
  if (typeof data === 'object') {
    headers.append('Content-type', 'application/json')
    return JSON.stringify(data)
  }
  return data
}
