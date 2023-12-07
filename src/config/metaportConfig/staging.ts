import { ETH_EUROPA_CALYPSO, ETH_ETHEREUM_EUROPA, ETH_ETHEREUM_EUROPA_CALYPSO } from "./staging/erc20/eth";
import { SKL_EUROPA_CALYPSO, SKL_ETHEREUM_EUROPA, SKL_ETHEREUM_EUROPA_CALYPSO, SKL_EUROPA_NEBULA } from "./staging/erc20/skl";
import { USDC_EUROPA_CALYPSO, USDC_ETHEREUM_EUROPA, USDC_ETHEREUM_EUROPA_CALYPSO } from "./staging/erc20/usdc";
import { TANK_CALYPSO_TANK, TANK_TANK_CALYPSO } from "./staging/erc721/tank";

export const getStagingParms = (from: string, to: string, token?: string) => {
    if (token === "SKL") {
        if (from === "ethereum" && to === "calypso") return SKL_ETHEREUM_EUROPA_CALYPSO;
        if (from === "europa" && to === "calypso") return SKL_EUROPA_CALYPSO;
        if (from === "europa" && to === "nebula") return SKL_EUROPA_NEBULA;
        return SKL_ETHEREUM_EUROPA;
    } else if (token === "USDC") {
        if (from === "ethereum" && to === "calypso") return USDC_ETHEREUM_EUROPA_CALYPSO;
        if (from === "europa" && to === "calypso") return USDC_EUROPA_CALYPSO;
        return USDC_ETHEREUM_EUROPA; 
    } else if (token === "TANK") {
        if (from === "calypso" && to === "tank") return TANK_CALYPSO_TANK;
        return TANK_TANK_CALYPSO;
    } else {
        if (from === "ethereum" && to === "calypso") return ETH_ETHEREUM_EUROPA_CALYPSO;
        if (from === "europa" && to === "calypso") return ETH_EUROPA_CALYPSO;
        return ETH_ETHEREUM_EUROPA;
    }
}

export const getStagingTransfers = (token?: string) : any => {
    if (token === "TANK") {
        return [
            {
                from: "tank",
                to: "calypso",
                chainOrder: ["Tank Chain", "Calypso"]
            },
            {
                from: "calypso",
                to: "tank",
                chainOrder: ["Calypso", "Tank Chain"]
            },
        ];
    } else {
        return [
            {
                from: "europa",
                to: "nebula",
                chainOrder: ["Europa", "Nebula"]
            },
            {
                from: "europa",
                to: "calypso",
                chainOrder: ["Europa", "Calypso"]
            },
            {
                from: "ethereum",
                to: "calypso",
                chainOrder: ["Ethereum", "Europa", "Calypso"]
            },
            {
                from: "ethereum",
                to: "europa",
                chainOrder: ["Ethereum", "Europa"]
            }
        ]
    }
}