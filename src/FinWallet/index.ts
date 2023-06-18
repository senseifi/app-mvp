import { FinExtensionWallet } from "./main-wallet";
import { finExtensionInfo } from "./registry";

const finExtension = new FinExtensionWallet(finExtensionInfo);

export const wallets = [finExtension];
