function convertToUpbitFormat(symbol: string): string {
  const cleanedSymbol = symbol.replace('/', '').toUpperCase();

  return `UPBIT:${cleanedSymbol}`;
}

export { convertToUpbitFormat };
