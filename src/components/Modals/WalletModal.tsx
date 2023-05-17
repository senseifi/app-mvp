import React from "react";
import { ChainProvider } from "@cosmos-kit/react";
import { WalletModalProps } from "@cosmos-kit/core";
import { Button, Modal } from "@mui/material";

//ignore file for now
const WalletModal = ({ isOpen, setOpen, walletRepo }: WalletModalProps) => {
  function onCloseModal() {
    setOpen(false);
  }

  return (
    <div>
      <Modal open={isOpen} onClose={onCloseModal}>
        <div>
          {walletRepo.wallets.map(({ walletName, connect }) => (
            <Button
              key={walletName}
              //   colorScheme="blue"
              //   variant="ghost"
              onClick={() => connect}
            >
              {walletName}
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default WalletModal;
