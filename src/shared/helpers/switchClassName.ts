export const switchClass = (condition: boolean | undefined, activeClass: string = 'active'): string => {
  return condition ? activeClass : ''
}
