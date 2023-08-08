import { ClientNotExistError } from "@cosmos-kit/core";

import { Fin } from "./types";

interface FinWindow {
  fin?: Fin;
}

export const getFinFromExtension: () => Promise<Fin | undefined> = async () => {
  if (typeof window === "undefined") {
    return void 0;
  }

  const fin = (window as FinWindow).fin;

  if (fin) {
    return fin;
  }

  if (document.readyState === "complete") {
    if (fin) {
      return fin;
    } else {
      throw ClientNotExistError;
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        if (fin) {
          resolve(fin);
        } else {
          reject(ClientNotExistError.message);
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
