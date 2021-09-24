export function memoize(fn, cache) {
  return (...args) => {
    const cacheKey = args.join(',')
    let result = cache.read(cacheKey)
    if (result === undefined) {
      result = fn(...args)
      cache.write(cacheKey, result)
    }

    return result
  }
}