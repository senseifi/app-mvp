import { Wallet } from '@cosmos-kit/core';
import { MainWalletBase } from '@cosmos-kit/core';

import { ChainFinExtension } from './chain-wallet';
import { FinClient } from './client';
import { getFinFromExtension } from './utils';

export class FinExtensionWallet extends MainWalletBase {
  constructor(walletInfo: Wallet) {
    super(walletInfo, ChainFinExtension);
  }

  async initClient() {
    this.initingClient();
    try {
      const fin = await getFinFromExtension();
      this.initClientDone(fin ? new FinClient(fin) : undefined);
    } catch (error) {
      this.logger?.error(error);
      this.initClientError(error);
    }
  }
}
