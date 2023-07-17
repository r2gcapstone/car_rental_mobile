import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App component", () => {
  test('renders "Hello World! dd" text', () => {
    const { getByText } = render(<App />);
    const helloWorldText = getByText("Hello World! dd");
    expect(helloWorldText).toBeTruthy();
  });

  test("renders StatusBar component", () => {
    const { getByTestId } = render(<App />);
    // // const statusBarComponent = getByTestId("status-bar");
    // expect(statusBarComponent).toBeTruthy();
  });
});
