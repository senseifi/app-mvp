import { AssetList } from "@chain-registry/types";

export const seiTestnet2AssetList: AssetList = {
  chain_name: "seitestnet2",
  assets: [
    {
      description:
        "The native staking and governance token of the Atlantic testnet version of Sei.",
      denom_units: [
        {
          denom: "usei",
          exponent: 0,
        },
        {
          denom: "sei",
          exponent: 6,
        },
      ],
      base: "usei",
      name: "Sei",
      display: "sei",
      symbol: "SEI",
      logo_URIs: {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/seitestnet2/images/sei.png",
      },
    },
  ],
};

export const rpcEndpoint = "https://rpc.atlantic-2.seinetwork.io/";
export const chainName = "seitestnet2";
