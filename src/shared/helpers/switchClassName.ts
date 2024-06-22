export const switchClass = (
  condition: boolean | undefined | any,
  activeClass: string = 'active'
): string => {
  return condition ? activeClass : ''
}
