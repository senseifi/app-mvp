import { getMainnetParams, getMainnetTransfers } from "./mainnet";
import { getStagingParms, getStagingTransfers } from "./staging";

export const getParams = (env: "staging" | "mainnet", from: string, to: string, token?: string) => {
    if (env === "staging") return getStagingParms(from, to, token);
    return getMainnetParams(from, to, token);
}

export const getTransfers = (env: "staging" | "mainnet", token?: string) => {
    if (env === "staging") return getStagingTransfers(token);
    return getMainnetTransfers(token);
}