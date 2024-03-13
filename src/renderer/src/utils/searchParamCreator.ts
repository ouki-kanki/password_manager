export const searchParamCreator = (key: string, value: string, searchParams: URLSearchParams): string => {
  const sp = new URLSearchParams(searchParams)
  if (value === null) {
    sp.delete(key)
  } else {
    sp.set(key, value)
  }

  return `?${sp.toString()}`
} 