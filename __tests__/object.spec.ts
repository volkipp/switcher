import { hasKey, hasValue, prop, eq } from '@/switcher'

describe('object conditional checkers', () => {
  const testObj = {
    test: 'exists',
    notDefined: undefined,
  }

  describe('hasKey()', () => {
    test('should return true when key exists', () => {
      expect(hasKey('test')(testObj)).toBe(true)
      expect(hasKey('notDefined')(testObj)).toBe(true)
      expect(hasKey('not-exist')(testObj)).toBe(false)
    })

    test('should return false when object does not exist', () => {
      expect(hasKey<unknown>('test')(undefined)).toBe(false)
    })

    test('should return false when object does not exist', () => {
      expect(hasKey<unknown>('test')(undefined)).toBe(false)
    })
  })

  describe('hasValue()', () => {
    test('should return true when key exists', () => {
      expect(hasValue('test')(testObj)).toBe(true)
      expect(hasValue('notDefined')(testObj)).toBe(false)
      expect(hasValue('not-exist')(testObj)).toBe(false)
    })
  })

  describe('prop()', () => {
    interface TestInterface {
      val: number
      type: string
    }

    test('should check against extracted key', () => {
      const testObj: TestInterface = { val: 1, type: 'test' }
      const valIs = prop<TestInterface>('val')
      const typeIs = prop<TestInterface>('type')

      expect(valIs(eq(1))(testObj)).toBe(true)
      expect(valIs(eq(0))(testObj)).toBe(false)
      expect(typeIs(eq('test'))(testObj)).toBe(true)
    })

    test('should default to strict equality when no checker passed', () => {
      const testObj: TestInterface = { val: 1, type: 'test' }
      const valIs = prop<TestInterface>('val')
      const typeIs = prop<TestInterface>('type')

      expect(valIs(1)(testObj)).toBe(true)
      expect(valIs(0)(testObj)).toBe(false)
      expect(typeIs('test')(testObj)).toBe(true)
    })
  })
})
