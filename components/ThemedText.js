import React, { useContext } from "react";
import { Text } from "react-native";
import ThemeContext from "../context/ThemeContext";

export default function ThemedText(props) {
  const theme = useContext(ThemeContext);

  const { style, ...otherProps } = props;
  const textStyle = [{ color: theme.textColor }, style];

  return <Text style={textStyle} {...otherProps} />;
}
