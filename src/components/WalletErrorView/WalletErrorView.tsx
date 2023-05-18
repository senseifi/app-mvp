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
    message ===
    "This wallet is not supported on mobile, please use desktop browsers.";

  const customLogoStatus = addCustom ? LogoStatus.Warning : LogoStatus.Error;

  const customContentHeader = addCustom ? "Just one more step..." : message;

  const customContentDesc = addCustom
    ? `This wallet is not supported on mobile web, please use the dApp browser in ${prettyName} mobile app or a desktop browser.`
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
      status={customLogoStatus}
      logo={logo}
      contentHeader={customContentHeader}
      contentDesc={customContentDesc}
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
