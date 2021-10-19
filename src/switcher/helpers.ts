import { Checker } from '.'

export function isChecker<T>(val: Checker<T> | T): val is Checker<T> {
  return typeof val === 'function'
}
