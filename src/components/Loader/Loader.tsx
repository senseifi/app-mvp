import React, { useEffect, useState } from "react";
import Image from "next/image";
import loader from "../../assets/loader.gif";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }, []);

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100000,
          }}
        >
          <Image height={35} width={35} src={loader} alt="loading" />
        </div>
      )}
    </div>
  );
};

export default Loader;
