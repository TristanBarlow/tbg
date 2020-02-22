export interface APIResponse<T> { status: number, data: T | undefined }

export function apiRequest<T> (
  path: string,
  method: 'GET' | 'POST' | 'PUT',
  responseType: XMLHttpRequestResponseType,
  data?: Record<string, any>
): Promise<APIResponse<T>> {
  const xhr = new XMLHttpRequest()
  xhr.responseType = responseType
  return new Promise<APIResponse<T>>((resolve, rejects) => {
    try {
      xhr.addEventListener('readystatechange', async function () {
        if (xhr.readyState === 4) {
          resolve({ data: this.response, status: xhr.status })
        }
      })
      xhr.onerror = err => rejects(err)
      xhr.ontimeout = _ => rejects()
      xhr.onabort = _ => rejects()
      xhr.open(method, path, true)
      xhr.setRequestHeader('Content-type', 'application/json')
      if (data) xhr.send(JSON.stringify(data))
      else xhr.send()
    } catch (e) {
      console.log(e)
      rejects()
    }
  })
}