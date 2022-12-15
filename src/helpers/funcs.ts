import { faker } from '@faker-js/faker'

export const random = (min: number, max: number, precision = 1) => {
  return faker.datatype.number({ min, max, precision })
}

export const sleep = (milliseconds: number) => {
  const date = Date.now()

  let currentDate: number | null = null

  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}
