export function round(mount: number) {
  const decimals = 100
  return Math.round(mount * decimals) / decimals
}
