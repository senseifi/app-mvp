import type { NextApiRequest, NextApiResponse } from "next";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { rpcEndpoint } from "@/config/sei";
import {
  SenseifiStakingNllClient,
  SenseifiStakingNllQueryClient,
} from "@/contract_clients/SenseifiStakingNll.client";
import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { seiStakingNLLContract } from "@/config/contracts";
import { StdFee, coin } from "@cosmjs/amino";
import { nsToSecs } from "@/utils";

const fromHexString = (hexString: string) =>
  Uint8Array.from(
    hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
  );

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    let signer;

    if (process.env.ADMIN_MNEMONIC !== undefined) {
      signer = await DirectSecp256k1HdWallet.fromMnemonic(
        process.env.ADMIN_MNEMONIC,
        {
          prefix: "SEI",
        }
      );
    } else if (process.env.ADMIN_PK !== undefined) {
      signer = await DirectSecp256k1Wallet.fromKey(
        fromHexString(process.env.ADMIN_PK),
        "SEI"
      );
    } else {
      throw Error("Mnemonic nor private keys of admin wallet found");
    }

    const adminAddr = await signer.getAccounts().then((v) => v[0].address);

    const client = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      signer
    );

    const readContract = new SenseifiStakingNllQueryClient(
      client,
      seiStakingNLLContract
    );

    const params = await readContract.getParams();
    const globalState = await readContract.getGlobalState();

    if (
      Math.floor(Date.now() / 1000) - nsToSecs(globalState.last_unbond_time) <=
      Number(params.min_unbond_interval_sec)
    ) {
      return response
        .status(200)
        .json({ success: true, message: "Not the time to unbond" });
    }

    if (BigInt(globalState.total_to_be_unbonded) === BigInt(0)) {
      return response
        .status(200)
        .json({ success: true, message: "0 tokens to be unbonded" });
    }

    const writeContract = new SenseifiStakingNllClient(
      client,
      adminAddr,
      seiStakingNLLContract
    );

    const fee: StdFee = {
      amount: [coin("10000", params.denom)],
      gas: "500000",
    };

    const result = await writeContract.unbond(fee);

    return response
      .status(200)
      .json({ success: true, txHash: result.transactionHash });
  } catch (e) {
    let errorMsg = "";

    if (typeof e === "string") {
      errorMsg = e.toUpperCase();
    } else if (e instanceof Error) {
      errorMsg = e.message;
    }

    return response.status(500).json({ success: false, error: errorMsg });
  }
}
