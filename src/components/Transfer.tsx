import { Metaport } from "@skalenetwork/metaport"
import { TransferParams } from "@skalenetwork/metaport/build/core/interfaces";
import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";

interface Props {
    metaport: Metaport;
    transferConfig: TransferParams;
    setIsTransferring: Dispatch<SetStateAction<boolean>>;
    chainOrder: string[];
}

export default function Transfer(props: Props) {

    const {
        metaport,
        transferConfig,
        setIsTransferring,
        chainOrder
    } = props;

    const isMultiChain: boolean = chainOrder.length > 2;
    console.log("Transfer Config: ", transferConfig)
    const tokenSymbol: string = (transferConfig.tokenKeyname?.includes("_") ? transferConfig.tokenKeyname?.split("_")[1] : transferConfig.tokenKeyname?.toUpperCase()) ?? " ETH";

    const runProcess = async() => {
        setIsTransferring(true);
        setTimeout(() => {
            metaport.transfer(transferConfig);
        }, 500)
        
        // Transfer from ETH -> Europa 
        // const l1ToEuropaParams: interfaces.TransferParams = {
        //     amount: "0.00005",
        //     chains: [
        //         "mainnet", 
        //         "staging-legal-crazy-castor"
        //     ],
        //     tokenType: dataclasses.TokenType.eth,
        //     lockValue: false,
        //     tokenKeyname: "eth"
        // };
        
        
        // metaport.transfer({
        //     amount: "0.1",
        //     chains: [
        //         "mainnet", 
        //         "staging-utter-unripe-menkar"
        //     ],
        //     tokenType: dataclasses.TokenType.eth,
        //     tokenKeyname: "eth",
        //     route: {
        //         hub: "staging-legal-crazy-castor",
        //         tokenKeyname:`_ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24`,
        //         tokenType: dataclasses.TokenType.erc20
        //     }
        // })
        
        
        // const l1ToEuropaResult = await handleEvent("transfer");        
    }

    return (
        <div onClick={async() => await runProcess()} className="transfer">
            <h2>{chainOrder.join(" -> ")}</h2>
            <p className="type">{isMultiChain ? "Multichain Hop" : "Single Hop"}</p>
            <p className="amount">{transferConfig.amount ?? "0"} {tokenSymbol}</p>
        </div>
    )
}