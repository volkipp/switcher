import { eq } from '..'

export interface Checker<InputType> {
  (v: InputType): boolean
}

export type CheckerOrValue<T> = Checker<T> | T

export const asChecker = <T>(checkerOrValue: CheckerOrValue<T>): Checker<T> =>
  typeof checkerOrValue === 'function' ? (checkerOrValue as Checker<T>) : eq(checkerOrValue)

export const convertToCheckers = <T>(args: CheckerOrValue<T>[]): Checker<T>[] => {
  return args.map(asChecker)
}
