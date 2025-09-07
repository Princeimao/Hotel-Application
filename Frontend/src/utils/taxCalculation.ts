export function CalculateTax(price: number): number {
  if (price < 1000) {
    return 0;
  } else if (price > 1001 && 12500 < price) {
    return (price * 12) / 100;
  } else {
    return (price * 18) / 100;
  }
}
