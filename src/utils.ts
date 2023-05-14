export const truncateAddress = (
  address: string | undefined,
  numChars: number = 5
): string | undefined =>
  address
    ? address.slice(0, numChars) + "..." + address.slice(-numChars)
    : undefined;

export const nsToSecs = (ns: string) =>
  Math.floor(Number(BigInt(ns) / BigInt("1000000000")));

export const toAU = (
  amount: string,
  decimal: number = 6,
  precision: number = 6
) =>
  Number((BigInt(amount) * BigInt(10 ** precision)) / BigInt(10 ** decimal)) /
  10 ** precision;

export const toSU = (amount: number, decimal: number = 6) =>
  BigInt(amount * 10 ** decimal).toString();

export const roundToDP = (num: number, dp: number) => num.toFixed(dp);

export const calculateTickets = (
  totalTickets: number,
  totalStake: number,
  lastUpdateTime: number,
  gameStartTime: number,
  currentTime: number
) => {
  const validLastUpdateTime = Math.max(lastUpdateTime, gameStartTime);

  let inRange = false;
  if (lastUpdateTime >= gameStartTime) {
    inRange = true;
  }

  const validTotalTickets = inRange ? totalTickets : 0;

  return validTotalTickets + totalStake * (currentTime - validLastUpdateTime);
};
