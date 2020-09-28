import { Auth } from './Auth'

export interface APIResponse<T> { status: number, data?: T }

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

  console.log(body)
  const res = await fetch(`${ process.env.REACT_APP_SERVER_URL }${ path }`, { body, method, headers })
  if (res.status !== 200) {
    return {
      status: res.status
    }
  }

  const text = await res.text()
  try {
    return {
      data: JSON.parse(text, () => null),
      status: res.status
    }
  } catch (e) {
    return {
      status: res.status
    }
  }
}