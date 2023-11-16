export function convertPxToVw(px: number): number {
  return (px / window.innerWidth) * 100
}

export function convertPxToVh(px: number): number {
  return (px / window.innerHeight) * 100
}