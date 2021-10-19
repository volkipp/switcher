import { asChecker, Checker } from '.'

/**
 * Checks if an object both has a key defined AND it's value is not undefined
 * This is likely to be useful in most situations
 */
export const hasValue =
  <T extends Record<string | number, unknown>>(key: string | number) =>
  (obj: T) =>
    hasKey<T>(key)(obj) && obj[key] !== undefined

export const hasKey =
  <T>(key: PropertyKey) =>
  (obj: T) =>
    obj !== undefined && Object.prototype.hasOwnProperty.call(obj, key)

export const prop =
  <T, K extends keyof T = keyof T>(key: K) =>
  (condition: Checker<T[K]> | T[K]) =>
  (obj: T) => {
    return asChecker(condition)(obj[key])
  }
