import { useContext } from "react";
import { SeiWalletContext } from "sei-js/packages/react/dist";

const useSelectWallet = () => {
  const { setShowConnectModal } = useContext(SeiWalletContext);

  const openModal = () => setShowConnectModal(true);

  const closeModal = () => setShowConnectModal(false);

  return { openModal, closeModal };
};

export default useSelectWallet;
