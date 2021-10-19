export interface Result<InputType, OutputType = void> {
  /**
   * @param value The value to check against
   * @returns The output from the resulting check
   */
  (value: InputType): OutputType
}
