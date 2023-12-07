export type MetaportEvents = "transfer" | "unwrap" | "eth_unlocked" | "connected" | "balance";


const events: Record<MetaportEvents, string> = {
    transfer: "metaport_transferComplete",
    unwrap: "metaport_unwrapComplete",
    eth_unlocked: "metaport_ethUnlocked",
    connected: "metaport_connected",
    balance: "metaport_balance"
};

const getEvent = (event: MetaportEvents) : string => {
    return events[event];
}

export interface ITransferResponse {tokenSymbol: string, from: string, to: string, tx: any};
export interface IUnwrapCompleteResponse {tokenSymbol: string, chain: string, tx: any};
export interface IEthUnlockedResponse {tx: any};
export interface IConnectedResponse {};
export interface IBalanceResponse {tokenSymbol: string, schainName: string, balance: any};

type MetaportEventResponse = ITransferResponse | IUnwrapCompleteResponse | IEthUnlockedResponse | IConnectedResponse | IBalanceResponse;

export const handleEvent = (event: MetaportEvents) : Promise<MetaportEventResponse> => {

    return new Promise((resolve, reject) => {

        try {
            window.addEventListener(getEvent(event), (e: any) => {
                if (event === "unwrap") resolve(e as IUnwrapCompleteResponse); 
                if (event === "transfer") resolve(e as ITransferResponse); 
                if (event === "eth_unlocked") resolve(e as IEthUnlockedResponse);
                if (event === "connected") resolve(e as IConnectedResponse);
                if (event === "balance") resolve(e as IBalanceResponse);
            })
        } catch (err) {
            reject(err);
        }

        window.removeEventListener(getEvent(event), () => {}, false);
    })    
}