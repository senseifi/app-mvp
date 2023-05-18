import { Box } from "@chakra-ui/react";
import {
  ConnectWalletButton,
  LogoStatus,
  SimpleDisplayModalContent,
  SimpleModalHead,
  SimpleModalView,
} from "@cosmology-ui/react";
import { WalletViewProps } from "@cosmos-kit/core";
import React from "react";

export const WalletErrorView = ({
  onClose,
  onReturn,
  wallet,
}: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo },
    message,
  } = wallet;

  const addCustom =
    prettyName === "Leap" &&
    message ===
      "This wallet is not supported on mobile, please use desktop browsers.";

  const status = addCustom ? LogoStatus.Warning : LogoStatus.Error;

  const contentHeader = addCustom ? "Just one more step" : message;

  const contentDesc = addCustom
    ? `This wallet is not supported in mobile browsers, please use the dApp browser in ${prettyName} mobile app or a desktop browser.`
    : message;

  const modalHead = (
    <SimpleModalHead
      title={prettyName}
      backButton={true}
      onClose={() => {
        wallet.reset();
        onClose();
      }}
      onBack={() => {
        wallet.reset();
        onReturn();
      }}
    />
  );

  const modalContent = (
    <SimpleDisplayModalContent
      status={status}
      logo={logo}
      contentHeader={contentHeader}
      contentDesc={contentDesc}
      bottomButton={
        <Box px={6}>
          <ConnectWalletButton
            buttonText={"Change Wallet"}
            onClick={() => {
              wallet.reset();
              onReturn();
            }}
          />
        </Box>
      }
    />
  );

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />;
};
