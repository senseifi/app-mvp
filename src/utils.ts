export const truncateAddress = (
  address: string | undefined,
  numChars: number = 5
): string | undefined =>
  address
    ? address.slice(0, numChars) + "..." + address.slice(-numChars)
    : undefined;

export const nsToSecs = (ns: string) =>
  Math.floor(Number(BigInt(ns) / BigInt("1000000000")));
