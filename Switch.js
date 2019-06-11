import React, { useState } from "react";
import ReactNativeAnimated from "./ReactNativeAnimated";
import Reanimated from "./Reanimated";

const Switch = () => {
  const [state, setState] = useState("react-native");

  if (state === "react-native") {
    return <ReactNativeAnimated handleSwitch={() => setState("reanimated")} />;
  }

  return <Reanimated handleSwitch={() => setState("react-native")} />;
};

export default Switch;
