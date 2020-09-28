import { Auth } from './Auth'

export interface APIResponse<T> { status: number, data?: T }

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
    } else if (typeof data === 'object') {
      headers.append('Content-type', data.type)
      body = JSON.stringify(data)
    }
  }

  if (Auth.isAuthed || key) {
    headers.append('key', Auth.key || key || '')
  }

  console.log(process.env.REACT_APP_SERVER_URL)
  const res = await fetch(`${ process.env.REACT_APP_SERVER_URL }${ path }`, { body, method, headers })
  if (res.status !== 200) {
    return {
      status: res.status
    }
  }
  return {
    data: await res.json(),
    status: res.status
  }
}