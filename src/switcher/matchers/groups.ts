import { convertToCheckers } from '../helpers'
import { Checker, CheckerOrValue } from '../interfaces/Checker'

export const all = <T>(...args: Checker<T>[]) => {
  const handler: Checker<T> = (val: T) => {
    for (let i = 0; i < args.length; i++) {
      if (!args[i](val) === true) {
        return false
      }
    }
    return true
  }
  return handler
}

export const any = <T>(...args: CheckerOrValue<T>[]) => {
  const checkers = convertToCheckers(args) // convert raw values
  const handler: Checker<T> = (v: T) => {
    for (let i = 0; i < checkers.length; i++) {
      if (checkers[i](v) === true) {
        return true
      }
    }
    return false
  }
  return handler
}

export const none = <T>(...args: CheckerOrValue<T>[]) => {
  const checkers = convertToCheckers(args) // convert raw values
  const handler: Checker<T> = (v) => {
    for (let i = 0; i < checkers.length; i++) {
      if (checkers[i](v) === true) {
        return false
      }
    }
    return true
  }
  return handler
}
