import { CFG } from '../env'
import { Auth } from './Auth'

export type APIResponse<T> = { status: 200, success: true, data: T } | { status: number, success: false }

export async function apiRequest<T> (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: Record<string, any> | File,
): Promise<APIResponse<T>> {
  const headers: Headers = new Headers()
  let body: any = data
  if (data) {
    if (data instanceof File) {
      headers.append('Content-type', data.type)
    } else if (typeof data === 'object') {
      headers.append('Content-type', 'application/json')
      body = JSON.stringify(data)
    }
  }

  if (Auth.isAuthed) {
    headers.append('key', Auth.key || '')
  }

  const res = await fetch(`${ CFG.SERVER_URL }${ path }`, { body, method, headers })
  if (res.status !== 200) {
    return {
      success: false,
      status: res.status
    }
  }

  try {
    return {
      success: true,
      data: await res.json(),
      status: res.status
    }
  } catch (e) {
    return {
      success: false,
      status: res.status
    }
  }
}
