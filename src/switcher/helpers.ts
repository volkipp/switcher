import { Checker, CheckerOrValue } from '@/switcher/interfaces/Checker'
import { eq } from '@/switcher/matchers/eq'

/**
 * Checks if a value is a checker function or a raw value
 * @param val The value to test if it is a checker function or a raw value
 * @returns
 */
export function isChecker<T>(val: Checker<T> | T): val is Checker<T> {
  return typeof val === 'function'
}
export const asChecker = <T>(checkerOrValue: CheckerOrValue<T>): Checker<T> =>
  typeof checkerOrValue === 'function' ? (checkerOrValue as Checker<T>) : eq(checkerOrValue)

export const convertToCheckers = <T>(args: CheckerOrValue<T>[]): Checker<T>[] => {
  return args.map(asChecker)
}
