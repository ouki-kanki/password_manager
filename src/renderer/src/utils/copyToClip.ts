export const copyToClip = (value: string): void => {
  navigator.clipboard.writeText(value)
}
