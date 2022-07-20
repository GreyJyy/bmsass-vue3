export const getObjectKeys = (obj: any = {}, keys: string[] = []) =>
  Object.keys(obj).reduce(
    (acc: any, key: string) => (
      keys.includes(key) && (acc[key] = obj[key]), acc
    ),
    {}
  )
