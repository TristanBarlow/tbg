export function toTitle (str: string): string {
  let out = str.replace(/-[a-z]/g, (x) => {
    return x.replace('-', ' ').toUpperCase()
  })

  if (out.length > 0) out = out[0].toUpperCase() + out.substr(1, out.length - 1)
  return out
}

export function toKebab (str: string): string {
  return str.replace(/ /g, '-').toLowerCase()
}
