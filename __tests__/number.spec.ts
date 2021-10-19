import { eq, gt, gte, lt, lte } from '@/switcher'

describe('number conditional checkers', () => {
  test('eq should return true', () => {
    const testObj = { obj: 'hi' }
    expect(eq(5)(5)).toBe(true)
    expect(eq('hi')('hi')).toBe(true)
    expect(eq(testObj)(testObj)).toBe(true)
  })

  test('eq should return false', () => {
    expect(eq(5)(6)).toBe(false)
    // Strict equality
    expect(eq({ obj: 'hi' })({ obj: 'hi' })).toBe(false)
  })

  test('lt should return false when right hand number is not less than', () => {
    expect(lt(5)(6)).toBe(false)
    expect(lt(5)(5)).toBe(false)
  })

  test('lt should return true when right hand number is greater than', () => {
    expect(lt(5)(4)).toBe(true)
  })

  test('lte should return true when right hand number is greater than or equal', () => {
    expect(lte(5)(4)).toBe(true)
    expect(lte(5)(5)).toBe(true)
  })

  test('gt should return false when right hand number is not less than', () => {
    expect(gt(6)(5)).toBe(false)
    expect(gt(5)(5)).toBe(false)
  })

  test('gt should return true when right hand number is greater than', () => {
    expect(gt(4)(5)).toBe(true)
  })

  test('gte should return true when right hand number is greater than or equal', () => {
    expect(gte(4)(5)).toBe(true)
    expect(gte(5)(5)).toBe(true)
  })
})
