export const eq =
  <T, K extends unknown>(value: T) =>
  (input: K) =>
    input === value
