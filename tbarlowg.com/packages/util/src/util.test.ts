import { toTitle, toKebab } from './util'

describe('util test', () => {
  it('To Title', () => {
    expect(toTitle('foo-bar-b')).toBe('Foo Bar B')
    expect(toTitle('')).toBe('')
    expect(toTitle('foo')).toBe('Foo')
  })

  it('To Kebab', () => {
    expect(toKebab('Foo Bar 123')).toBe('foo-bar-123')
    expect(toKebab('foo')).toBe('foo')
  })
})