/* tslint:disable */

export const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
)

export const strongPasswordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
export const normalPasswordRegex = new RegExp(/[A-za-z0–9_]/g)

export const atLeastOneDigit = new RegExp(/^(?=.*\d)[a-zA-Z0-9]{1,}$/)
export const atLeastOneLowerCase = new RegExp(/^(?=.*[a-z])[a-zA-Z0-9]{1,}$/)
export const atLeastOneUpperCase = new RegExp(/^(?=.*[A-Z])[a-zA-Z0-9]{1,}$/)
