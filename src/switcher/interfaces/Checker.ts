export interface Checker<InputType> {
  (v: InputType): boolean
}

export type CheckerOrValue<T> = Checker<T> | T
