function discountCalc(oldPrice, currentPrice) {
  const discount = ((oldPrice - currentPrice) / oldPrice) * 100
  
  return Math.round(Math.abs(discount))
}