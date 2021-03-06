# Switcher Map

Switcher is a zero-dependency micro-library designed to make switch / case statements and if-else statements cleaner and easier to follow. It is written in Typescript, though it works in vanilla javascript just fine. 

Simply call the `switcher()` method, and build a list of checks for it to run. 

## Installation

```bash
yarn add switcher-map
```
or, if you prefer npm:
```bash
npm i switcher-map
```


## Basic Functionality

Here is a basic example of a switcher which takes in a number and returns a string. The left side (checker) takes the passed in parameter and returns a boolean. If that checker function returns true, the right side (resolver) is executed, and its return vale passed. 

```typescript
import { switcher } from 'switcher-map'
const convertNumber = switcher<number, string>()
	.check((num) => num === 0, (num) => "zero")
	.check((num) => num === 1, (num) => "one")
	.noMatch(() => "no match") // If none of the above conditions are met, run the noMatch function

console.log(convertNumber(0)) // prints "zero"
console.log(convertNumber(1)) // prints "one"
console.log(convertNumber(3)) // prints "no match"
```



Although it works, the above example isn't exactly the cleanest. There are a number of checker utility functions to clean up the above example. The most basic is the equality utility function:

```typescript
import { switcher, eq } from 'switcher-map'
const convertNumber = switcher<number, string>()
	.check(eq(0), (num) => "zero")
	.check(eq(1), (num) => "one")
	.noMatch(() => "no match")

console.log(convertNumber(0)) // prints "zero"
console.log(convertNumber(1)) // prints "one"
console.log(convertNumber(3)) // prints "no match"
```

That looks much better! If all you need is simple equality checks, however, switcher conviniently allows you to pass literal values in both the checker and resolvers. Below is the equivalent of the same two examples above:

```typescript
import { switcher } from 'switcher-map'
const convertNumber = switcher<number, string>()
	.check(0, "zero")
	.check(1, "one")
	.noMatch("no match")

console.log(convertNumber(0)) // prints "zero"
console.log(convertNumber(1)) // prints "one"
console.log(convertNumber(3)) // prints "no match"
```



## Other examples

Although switcher works well to convert or map values, you do not need to return a value. You can simply have switcher call methods when certain conditions are met. You can also break up your code across multiple functions, and even multiple files.

```typescript
import { switcher } from 'switcher-map'

const enum State {
  Pending = 'pending'
  Complete = 'complete'
}

interface Context {
  state: State
  message: string
}

const onPending = (context: Context) => {
  console.log("State is pending: " + context.message)
}

const onComplete = (context: Context) => {
  console.log("State is complete: " + context.message)
}

const run = switcher<Context, void>()
	.check((context) => context.state === State.Pending, onPending)
	.check((context) => context.state === State.Complete, onComplete)

run({ state: State.Pending, message: 'working'}) // logs: "State is pending: working"
run({ state: State.Complete, message: 'All done!'}) // logs: "State is complete: All done!"

// Or, the same as above with a checker utility method:
const stateEq = (state: State) => (context: Context) => context.state === state
const runWithHelper = switcher<Context, void>()
	.check(stateEq(State.Pending), onPending)
	.check(stateEq(State.Complete), onComplete)

```





## Checker Utility Methods

Switcher uses a functional approach. The `eq()` helper is very simple behind the scenes:

```typescript
const eq = <InputType>(targetValue: InputType) => (inputValue: InputType) => num === input
// Or in javascript:
// const eq = (targetValue) => (inputValue) => num === input
const isOne = eq(1) 
console.log( isOne(1) ) // true
console.log( isOne(2) ) // false
```

 I encourage you to look at the other helper methods to see how you can write your own for specific use cases very quickly.  

