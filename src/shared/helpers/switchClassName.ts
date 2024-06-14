export const switchClass = (condition: boolean, activeClass: string = 'active'): string => {
  return condition ? activeClass : ''
}
