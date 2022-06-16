import { Global } from "@emotion/react";
import resetStyle from "../src/styles/reset";
import globalStyle from "../src/styles/style";
import GlobalProvider from "../src/store/GlobalProvider";

export const decorators = [
  Story => (
    <>
      <Global styles={[resetStyle, globalStyle]} />
      <GlobalProvider>
        <Story />
      </GlobalProvider>
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
