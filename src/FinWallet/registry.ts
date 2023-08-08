import logo from "./logo.png";
import { Wallet } from "@cosmos-kit/core";

export const finExtensionInfo: Wallet = {
  name: "fin-extension",
  prettyName: "Fin",
  logo: logo.src,
  mode: "extension",
  mobileDisabled: true,
  rejectMessage: {
    source: "Request rejected",
  },
  connectEventNamesOnWindow: ["fin_keystorechange"],
  downloads: [
    {
      device: "desktop",
      browser: "chrome",
      link: "https://chrome.google.com/webstore/detail/fin-wallet-for-sei/dbgnhckhnppddckangcjbkjnlddbjkna",
    },
    {
      link: "https://chrome.google.com/webstore/detail/fin-wallet-for-sei/dbgnhckhnppddckangcjbkjnlddbjkna",
    },
  ],
};
