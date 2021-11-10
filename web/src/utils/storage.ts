import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { encryptData, decryptData } from './encrypt'

export const getItem = (key: string, encrypted = false) => {
  let value = localStorage.getItem(key)

  if (!value) {
    return null
  }

  if (encrypted) {
    value = decryptData(value)
  }

  return JSON.parse(JSON.stringify(value))
}

export const setItem = (key: string, data: unknown, encrypted = false) => {
  let value = JSON.stringify(data)

  if (encrypted) {
    value = encryptData(value)
  }

  return localStorage.setItem(key, value)
}

export const removeItem = (key: string) => {
  return localStorage.removeItem(key)
}

export const removeItems = (keys: string[]) => {
  if (!keys.length) throw Error()

  return keys.map((k) => localStorage.removeItem(k))
}

export const clear = () => {
  return localStorage.clear()
}

export const getItemNext = (key: string) => {
  let item = localStorage.getItem(key)

  if (!item) {
    item = undefined
  } else {
    item = JSON.parse(item)
  }

  return item
  // try {
  //   if (cache[key]) {
  //     return cache[key]
  //   } else {
  //     return (cache[key] = new BehaviorSubject(
  //       JSON.parse(localStorage.getItem(key))
  //     ))
  //   }
  // } catch (err) {
  //   throw new Error()
  // }
}
export const setItemNext = <T>(
  key: string,
  value: T,
  cache: BehaviorSubject<T>,
  encrypted = false
): BehaviorSubject<T> => {
  let serializeState = JSON.stringify(value)

  if (encrypted) {
    serializeState = encryptData(serializeState)
  }

  localStorage.setItem(key, serializeState)

  if (!cache[key]) {
    return (cache[key] = new BehaviorSubject(
      JSON.parse(JSON.stringify(localStorage.getItem(key)))
    ))
  } else {
    cache[key].next(serializeState)
    return cache[key]
  }
  // try {
  //   const serializeState = JSON.stringify(value)
  //   localStorage.setItem(key, serializeState)

  //   if (cache[key]) {
  //     cache[key].next(value)
  //     return cache[key]
  //   }
  // } catch (err) {
  //   throw new Error(err)
  // }
}

export const watch = <T>(
  key: string,
  cache: BehaviorSubject<T>,
  encrypted = false
): BehaviorSubject<T> => {
  if (!cache[key]) {
    const value = localStorage.getItem(key)

    // if (encrypted) {
    //   value = decryptData(value)
    // }

    return (cache[key] = new BehaviorSubject(JSON.parse(JSON.stringify(value))))
  }

  let item = localStorage.getItem(key)

  if (!item) {
    item = undefined
  } else {
    if (encrypted) {
      item = decryptData(item)
    } else {
      item = JSON.parse(JSON.stringify(item))
    }
  }

  cache[key].next(item)
  return cache[key]
}
