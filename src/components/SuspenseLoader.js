import React from "react";
import Loader from "./Loader";

const SuspenseLoader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Loader />
    </div>
  );
};

export default SuspenseLoader;
