import { dataclasses } from "@skalenetwork/metaport";
import { TransferParams } from "@skalenetwork/metaport/build/core/interfaces";

export const SKL_ETHEREUM_EUROPA: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-legal-crazy-castor"
    ],
    tokenType: dataclasses.TokenType.erc20,
    tokenKeyname: "_SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11"
}

export const SKL_EUROPA_CALYPSO: TransferParams = {
    amount: "5",
    chains: [
        "staging-legal-crazy-castor",
        "staging-utter-unripe-menkar",
    ],
    tokenKeyname:`_SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6`,
    tokenType: dataclasses.TokenType.erc20,
}

export const SKL_EUROPA_NEBULA: TransferParams = {
    amount: "0.025",
    chains: [
        "staging-legal-crazy-castor",
        "staging-faint-slimy-achird",
    ],
    tokenKeyname:`_SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6`,
    tokenType: dataclasses.TokenType.erc20,
}

export const SKL_ETHEREUM_EUROPA_CALYPSO: TransferParams = {
    amount: "0.1",
    chains: [
        "mainnet", 
        "staging-utter-unripe-menkar"
    ],
    tokenType: dataclasses.TokenType.erc20,
    tokenKeyname: "_SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11",
    route: {
        hub: "staging-legal-crazy-castor",
        tokenKeyname:`_SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6`,
        tokenType: dataclasses.TokenType.erc20
    }
};