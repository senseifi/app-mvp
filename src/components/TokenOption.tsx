import { Dispatch, SetStateAction } from "react";
import { TokenInfo } from "./../types/customTypes";

type Props = {
  token: TokenInfo;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function TokenOption(props: Props) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        props.setToken(props.token.symbol);
      }}
      className="tokenOption"
    >
      <div>
        <img src={props.token.image} alt="Something here..." />
      </div>
      <div>
        <p>
          {props.token.symbol} {props.token.nft?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
