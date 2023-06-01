import { seiTokenDenom, senTokenDenom } from "./config/contracts";

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
  BigInt(Math.floor(amount * 10 ** decimal)).toString();

export const roundToDP = (num: number, dp: number) => num.toFixed(dp);

export const calculateTickets = (
  totalTickets: BigInt,
  totalStake: BigInt,
  lastUpdateTime: BigInt,
  gameStartTime: BigInt,
  currentTime: BigInt
) => {
  const validLastUpdateTime =
    lastUpdateTime > gameStartTime ? lastUpdateTime : gameStartTime;

  let inRange = false;
  if (lastUpdateTime >= gameStartTime) {
    inRange = true;
  }

  const validTotalTickets: BigInt = inRange ? totalTickets : BigInt(0);

  let diff =
    BigInt(currentTime.toString()) - BigInt(validLastUpdateTime.toString());
  if (diff < 0) diff = BigInt(0);

  const additional = BigInt(totalStake.toString()) * BigInt(diff.toString());

  const newTickets =
    (BigInt(validTotalTickets.toString()) + BigInt(additional.toString())) /
    BigInt(10 ** 4); // ticket scale factor for FE only

  return newTickets;
};

export const bigIntMax = (args: BigInt[]) =>
  args.reduce((m, e) => (e > m ? e : m));

export const getPrettyDenom = (denom: string) => {
  if (denom === seiTokenDenom) {
    return "SEI";
  } else if (denom === senTokenDenom) {
    return "SEN";
  } else {
    return denom;
  }
};

export const getTokenImg = (denom: string) => {
  if (denom === seiTokenDenom) {
    return "/tokenIcons/sei.png";
  } else if (denom === senTokenDenom) {
    return "/tokenIcons/sen.png";
  } else {
    return `/tokenIcons/${denom}.png`;
  }
};
