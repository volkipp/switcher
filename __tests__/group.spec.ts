import { all, any, none } from '@/switcher'

describe('group conditional checkers', () => {
  const returnsTrue = (_: string) => true
  const returnsFalse = (_: string) => false

  test('should return true when all return true', () => {
    expect(all(returnsTrue, returnsTrue, returnsTrue)('')).toBe(true)
    expect(all(returnsTrue, returnsFalse, returnsTrue)('')).toBe(false)
  })

  test('should return true when any return true', () => {
    expect(any(returnsTrue, returnsTrue, returnsTrue)('')).toBe(true)
    expect(any(returnsTrue, returnsFalse, returnsTrue)('')).toBe(true)
    expect(any(returnsFalse, returnsFalse, returnsFalse)('')).toBe(false)
  })

  test('should return true when all return false', () => {
    expect(none(returnsTrue, returnsTrue, returnsTrue)('')).toBe(false)
    expect(none(returnsTrue, returnsFalse, returnsTrue)('')).toBe(false)
    expect(none(returnsFalse, returnsFalse, returnsFalse)('')).toBe(true)
  })

  test('should allow passing values which are not functions', () => {
    expect(none('foo', 'bar', 'baz')('bar')).toBe(false)
    expect(none('foo', 'bar', 'baz')('no match')).toBe(true)

    expect(any('1', '2')('1')).toBe(true)
    expect(any('1', '2')('3')).toBe(false)
  })
})
