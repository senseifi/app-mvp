import { ETH_ETHEREUM_EUROPA } from "./mainnet/erc20/eth";
import { SKL_EUROPA_NEBULA } from "./mainnet/erc20/skl";

export const getMainnetParams = (from: string, to: string, token?: string) => {
    if (token === "SKL") {
        return SKL_EUROPA_NEBULA;
    } else {
        // if (from === "ethereum" && to === "calypso") return ETH_ETHEREUM_EUROPA_CALYPSO;
        // if (from === "europa" && to === "calypso") return ETH_EUROPA_CALYPSO;
        return ETH_ETHEREUM_EUROPA;
    }
}

export const getMainnetTransfers = (token?: string) : any => {
    return [
        {
            from: "europa",
            to: "nebula",
            chainOrder: ["Europa", "Nebula"]
        }
    ];
}