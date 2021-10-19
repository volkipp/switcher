import { switcher } from '@/switcher'
import { Switcher } from '@/switcher/interfaces/Switcher'

describe('switcher', () => {
  let getBoolean: Switcher<string, boolean>
  let getString: Switcher<string, string>

  beforeEach(() => {
    getBoolean = switcher<string, boolean>().check('test1', () => true)
    getString = switcher<string, string>().check('test1', () => 'result1')
  })

  test('return resulting value when correct condition met', () => {
    expect(getBoolean('test1')).toBe(true)
    expect(getBoolean('test2')).toBeUndefined()
    expect(getString('test1')).toBe('result1')
    expect(getString('test2')).toBeUndefined()
  })

  test('return result when there is no match', () => {
    getBoolean.noMatch(() => false)
    getString.noMatch(() => 'nomatch')
    expect(getBoolean('bad-test')).toBe(false)
    expect(getString('bad-test')).toBe('nomatch')
  })

  test('allow to pass non-functions as the result conditions', () => {
    const getBool = switcher<string, boolean>().check('test1', true)
    const getStr = switcher<string, string>().check('test1', 'result1')
    expect(getBool('test1')).toBe(true)
    expect(getStr('test1')).toBe('result1')
    expect(getBool('test2')).toBeUndefined()
    expect(getStr('test2')).toBeUndefined()
  })

  test('allow to pass non-functions as the result for non-matches', () => {
    getBoolean.noMatch(false)
    getString.noMatch('nomatch')
    expect(getBoolean('bad-test')).toBe(false)
    expect(getString('bad-test')).toBe('nomatch')
  })
})
