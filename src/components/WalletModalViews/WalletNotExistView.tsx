import { Box } from "@chakra-ui/react";
import {
  InstallWalletButton,
  LogoStatus,
  SimpleDisplayModalContent,
  ConnectWalletButton,
  SimpleModalHead,
  SimpleModalView,
} from "@cosmology-ui/react";
import { WalletViewProps } from "@cosmos-kit/core";
import React, { useCallback, useMemo } from "react";
import { GoDesktopDownload } from "react-icons/go";
import { RiChromeFill } from "react-icons/ri";
import { FaAndroid } from "react-icons/fa";
import { RiAppStoreFill } from "react-icons/ri";
import { GrFirefox } from "react-icons/gr";

export const WalletNotExistView = ({
  onClose,
  onReturn,
  wallet,
}: WalletViewProps) => {
  const {
    walletInfo: { prettyName, logo },
    downloadInfo,
    message,
  } = wallet;

  const onInstall = useCallback(() => {
    window.open(downloadInfo?.link, "_blank");
  }, [downloadInfo]);

  const icon = useMemo(() => {
    if (downloadInfo?.browser === "chrome") return RiChromeFill;
    if (downloadInfo?.browser === "firefox") return GrFirefox;
    if (downloadInfo?.os === "android") return FaAndroid;
    if (downloadInfo?.os === "ios") return RiAppStoreFill;
    return GoDesktopDownload;
  }, [downloadInfo]);

  const addCustom =
    prettyName === "Coin98" &&
    wallet.isMobile &&
    message === "Client Not Exist!";

  const status = addCustom ? LogoStatus.Warning : LogoStatus.Error;

  const contentHeader = addCustom
    ? "Just one more step"
    : `${prettyName} Not Installed`;

  const contentDesc = addCustom
    ? `This wallet is not supported in mobile browsers, please use the dApp browser in ${prettyName} mobile app or a desktop browser.`
    : downloadInfo?.link
    ? `If ${prettyName.toLowerCase()} is installed on your device, please refresh this page or follow the browser instruction.`
    : `Download link not provided. Try searching it or consulting the developer team.`;

  const bottomButton = addCustom ? (
    <Box px={6}>
      <ConnectWalletButton
        buttonText={"Change Wallet"}
        onClick={() => {
          wallet.reset();
          onReturn();
        }}
      />
    </Box>
  ) : (
    <InstallWalletButton
      icon={icon}
      buttonText={`Install ${prettyName}`}
      onClick={onInstall}
      disabled={!downloadInfo?.link}
    />
  );

  const modalHead = (
    <SimpleModalHead
      title={prettyName}
      backButton={true}
      onClose={onClose}
      onBack={onReturn}
    />
  );

  const modalContent = (
    <SimpleDisplayModalContent
      status={status}
      logo={logo}
      contentHeader={contentHeader}
      contentDesc={contentDesc}
      bottomButton={bottomButton}
    />
  );

  return <SimpleModalView modalHead={modalHead} modalContent={modalContent} />;
};
