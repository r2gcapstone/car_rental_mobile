import React, { useContext } from "react";
import { View, StatusBar } from "react-native";
import ThemeContext from "../context/ThemeContext";

export default function ThemedView(props) {
  const theme = useContext(ThemeContext);

  const { style, ...otherProps } = props;
  const viewStyle = [
    { backgroundColor: theme.backgroundColor },
    { paddingTop: StatusBar.currentHeight },
    style,
  ];

  return <View style={viewStyle} {...otherProps} />;
}
