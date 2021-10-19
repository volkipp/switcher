import { switcher, all, gt, lt, eq, none, any } from './switcher'

const notTwoOrFour = none(eq(2), eq(4)) // resulting function returns true if the input values are not 2 or 4
const customCondition = (inputValue: number) => inputValue === 7

const checkConditions = switcher<number, string>()
  .check(eq(1), 'one') // if the input value matches 1, return 'one'
  .check(5, 'five') // shorthand for check(eq(5), 'five')
  .check(customCondition, 'Custom value checker matched')
  .check(notTwoOrFour, (v) => `${v} is not 2 and not 4`)
  .noMatch((v) => `condition not found for ${v}. :(`)

checkConditions(1) // returns: 'one'
checkConditions(5) // returns: 'five'
checkConditions(7) // returns: 'Custom value checker matched'
checkConditions(6) // returns: '6 is not 2 and not 4'
checkConditions(4) // returns: 'condition not found for 4'
