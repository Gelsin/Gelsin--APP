import { Platform } from "react-native";

import variable from "./../variables/platform";

export default (variables = variable) => {
  const radioTheme = {
    ".selected": {
      "NativeBase.IconNB": {
        color: 'eb7b59',
        lineHeight: Platform.OS === "ios" ? 25 : variables.radioBtnLineHeight,
        height: Platform.OS === "ios" ? 20 : undefined
      }
    },
    "NativeBase.IconNB": {
      color: Platform.OS === "ios" ? "transparent" : '#eb7b59',
      lineHeight: Platform.OS === "ios"
        ? undefined
        : variables.radioBtnLineHeight,
      fontSize: Platform.OS === "ios" ? undefined : variables.radioBtnSize
    }
  };

  return radioTheme;
};
