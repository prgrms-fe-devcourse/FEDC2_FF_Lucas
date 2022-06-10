import { Global } from "@emotion/react";
import resetStyle from "../src/styles/reset";
import globalStyle from "../src/styles/style";

export const decorators = [
  Story => (
    <>
      <Global styles={[resetStyle, globalStyle]} />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
