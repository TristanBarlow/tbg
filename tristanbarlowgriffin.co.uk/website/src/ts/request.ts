import { Auth } from './Auth'

export interface APIResponse<T> { status: number, data: T | undefined }

export async function apiRequest<T> (
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: Record<string, any> | File,
  key?: string
): Promise<APIResponse<T>> {
  const headers: Headers = new Headers()
  let body: any = data
  if (data) {
    if (data instanceof File) {
      headers.append('Content-type', data.type)
    } else {
      headers.append('Content-type', data.type)
      body = JSON.stringify(data)
    }
  }

  if (Auth.isAuthed || key) {
    headers.append('key', Auth.key || key || '')
  }

  const res = await fetch(path, { body, method, headers })
  return {
    data: await res.json(),
    status: res.status
  }
}