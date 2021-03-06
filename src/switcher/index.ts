import { isChecker } from './helpers'
import { Checker } from './interfaces/Checker'
import { Result } from './interfaces/Result'
import { eq } from './matchers/eq'

export interface Switcher<InputType = unknown, OutputType = void>
  extends Result<InputType, OutputType> {
  /**
   * Adds a condition to check against
   */
  check(
    condition: Checker<InputType> | InputType,
    result: Result<InputType, OutputType> | OutputType
  ): Switcher<InputType, OutputType>

  /**
   * Runs if there is no match
   */
  noMatch(result: Result<InputType, OutputType> | OutputType): Switcher<InputType, OutputType>
}

export const switcher = <InputType = unknown, OutputType = void>() => {
  const cond: Array<Checker<InputType> | Result<InputType, OutputType>> = []

  // The function which runs when there is no match
  let final: Result<InputType, OutputType> | undefined = undefined

  // Make the context a function so the output of switcher is callable.
  const ctx = (value: InputType): OutputType | void => {
    for (let i = 0; i < cond.length; i += 2) {
      if (cond[i](value)) {
        return (cond[i + 1] as Result<InputType, OutputType>)(value)
      }
    }
    if (typeof final === 'function') {
      return final(value)
    }
  }

  const check = (
    condition: Checker<InputType> | InputType,
    result: Result<InputType, OutputType> | OutputType
  ) => {
    if (isChecker(condition)) {
      cond.push(condition)
    } else {
      cond.push(eq(condition))
    }

    // Wrap the result in a function if it isn't a function
    if (typeof result === 'function') {
      cond.push(result as Result<InputType, OutputType>)
    } else {
      cond.push(() => result)
    }

    return ctx as Switcher<InputType, OutputType>
  }

  const noMatch = (result: Result<InputType, OutputType> | OutputType) => {
    if (typeof result === 'function') {
      final = result as Result<InputType, OutputType>
    } else {
      final = () => result
    }
    return ctx as Switcher<InputType, OutputType>
  }

  ctx.check = check
  ctx.noMatch = noMatch
  return ctx
}

export * from './interfaces/Checker'
export * from './interfaces/Result'
export * from './matchers/numbers'
export * from './matchers/groups'
export * from './matchers/objects'
export * from './matchers/eq'
