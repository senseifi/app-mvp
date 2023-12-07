import { dataclasses } from "@skalenetwork/metaport";
import { TransferParams } from "@skalenetwork/metaport/build/core/interfaces";

export const ETH_ETHEREUM_EUROPA: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-legal-crazy-castor"
    ],
    tokenType: dataclasses.TokenType.eth,
    tokenKeyname: "eth"
}

export const ETH_EUROPA_CALYPSO: TransferParams = {
    amount: "0.025",
    chains: [
        "staging-legal-crazy-castor",
        "staging-utter-unripe-menkar",
    ],
    tokenKeyname:`_ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24`,
    tokenType: dataclasses.TokenType.erc20,
}

export const ETH_ETHEREUM_EUROPA_CALYPSO: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-utter-unripe-menkar"
    ],
    tokenType: dataclasses.TokenType.eth,
    tokenKeyname: "eth",
    route: {
        hub: "staging-legal-crazy-castor",
        tokenKeyname:`_ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24`,
        tokenType: dataclasses.TokenType.erc20
    }
};