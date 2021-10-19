import { Checker } from './Checker'
import { Result } from './Result'

export interface Switcher<InputType = unknown, OutputType = void>
  extends Result<InputType, OutputType> {
  /**
   * Adds a condition to check against
   */
  check(
    condition: Checker<InputType> | InputType,
    result: Result<InputType, OutputType> | OutputType
  ): Switcher<InputType, OutputType | undefined>

  /**
   * Runs if there is no match
   */
  noMatch(result: Result<InputType, OutputType> | OutputType): Switcher<InputType, OutputType>
}
