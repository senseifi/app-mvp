import React, { useContext, useEffect, useState } from "react";
import { WalletSelectModalProps } from "./types";
import { SeiWallet, SeiWalletContext } from "sei-js/packages/react/dist";
// import "./styles.css";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { BiErrorAlt } from "@react-icons/all-files/bi/BiErrorAlt";
import { BiError } from "@react-icons/all-files/bi/BiError";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";

const WalletSelectModal = ({
  wallets: inputWallets,
}: WalletSelectModalProps) => {
  const {
    connectedWallet,
    setTargetWallet,
    wallets,
    connectionError,
    targetWallet,
    setConnectionError,
    showConnectModal,
    setShowConnectModal,
  } = useContext(SeiWalletContext);

  const visibleWallets = inputWallets || wallets || [];

  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (connectedWallet || connectionError) {
      setIsConnecting(false);
    }
  }, [connectedWallet, connectionError]);

  const closeModal = (e: any) => {
    e.stopPropagation();
    setConnectionError(undefined);
    setShowConnectModal(false);
  };

  const renderWallet = (wallet: SeiWallet) => {
    const isConnectedWallet =
      connectedWallet?.walletInfo.name === wallet.walletInfo.name;

    const renderConnection = () => {
      if (isConnectedWallet)
        return <FaCheckCircle className="wallet__item--info-icon" />;
      return null;
    };

    const selectWallet = async () => {
      if (setTargetWallet) setTargetWallet(wallet);
      setIsConnecting(true);
      setConnectionError(undefined);
    };

    return (
      <div
        key={wallet.walletInfo.name}
        onClick={selectWallet}
        className={`wallet__item ${
          isConnectedWallet ? "wallet__item-connected" : ""
        } ${
          targetWallet?.walletInfo?.windowKey === wallet.walletInfo.windowKey
            ? "wallet__item-targeted"
            : ""
        }`}
      >
        <div className="wallet__item--info">
          <img
            alt={wallet.walletInfo.name}
            src={wallet.walletInfo.icon}
            className="wallet__item--info-icon"
          />
          <p className="wallet__item--info-name">{wallet.walletInfo.name}</p>
        </div>
        {renderConnection()}
      </div>
    );
  };

  const renderRightSide = () => {
    if (isConnecting) {
      return (
        <div className="card__right-centered">
          <img
            alt={targetWallet?.walletInfo.icon}
            src={targetWallet?.walletInfo.icon}
            className="card__right--connecting-icon"
          />
          <p className="card__right--item-title">
            Connecting to {targetWallet?.walletInfo.name}...
          </p>
        </div>
      );
    }

    const isWalletNotInstalled =
      targetWallet && !window[targetWallet.walletInfo.windowKey as never];

    if (isWalletNotInstalled) {
      return (
        <div className="card__right-centered">
          <BiErrorAlt className="card__right--icon" />
          <p className="card__right--title">
            {targetWallet?.walletInfo?.name || "Wallet"} not installed
          </p>
          {targetWallet?.walletInfo.website && (
            <a
              target="_blank"
              href={targetWallet.walletInfo.website}
              className="card__right--download"
            >
              Download {targetWallet?.walletInfo.name}
            </a>
          )}
        </div>
      );
    }

    if (connectionError) {
      return (
        <div className="card__right">
          <BiError className="card__right--icon" />
          <p className="card__right--title">
            We could not connect to{" "}
            {targetWallet?.walletInfo?.name || "your wallet"}
          </p>
          <div className="card__right--item">
            <p className="card__right--item-title">
              How to resolve this issue?
            </p>
            <p className="card__right--item-description">
              A pending action or a locked wallet can cause issues. Please open
              the extension manually and try again.
            </p>
          </div>
        </div>
      );
    }

    if (connectedWallet) {
      return (
        <div className="card__right-centered">
          <img
            alt={targetWallet?.walletInfo.icon}
            src={targetWallet?.walletInfo.icon}
            className="card__right--connecting-icon"
          />
          <p className="card__right--item-title">
            Connected to {targetWallet?.walletInfo.name}
          </p>
        </div>
      );
    }

    return (
      <div className="card__right">
        <p className="card__right--title">New to using a wallet?</p>
        <div className="card__right--item">
          <p className="card__right--item-title">
            A Secure Hub for Digital Transactions
          </p>
          <p className="card__right--item-description">
            Wallets provide a secure environment for signing and sending
            transactions involving your tokens and NFTs.
          </p>
        </div>
        <div className="card__right--item">
          <p className="card__right--item-title">A modern way to log in</p>
          <p className="card__right--item-description">
            Rather than generating new accounts and passwords for each website,
            simply link your wallet.
          </p>
        </div>
      </div>
    );
  };

  if (!showConnectModal) return null;

  return (
    <div onClick={closeModal} className="modal__background">
      <div onClick={(e) => e.stopPropagation()} className="modal__card">
        <div className="card__header">
          <h2 className="card__header--title">Connect a wallet</h2>
          <AiFillCloseCircle
            className="card__header--close"
            onClick={closeModal}
          />
        </div>
        <div className="card__content">
          <div className="card__content--wallets">
            {visibleWallets.map(renderWallet)}
          </div>
          <div className="card__content--separator" />
          {renderRightSide()}
        </div>
      </div>
    </div>
  );
};

export default WalletSelectModal;
