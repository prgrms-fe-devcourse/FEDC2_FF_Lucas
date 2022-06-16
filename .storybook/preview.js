import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import resetStyle from "../src/styles/reset";
import globalStyle from "../src/styles/style";
import GlobalProvider from "../src/store/GlobalProvider";

const queryClient = new QueryClient();

axios.defaults.baseURL = `http://kdt.frontend.2nd.programmers.co.kr:5006`;

export const decorators = [
  Story => (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Global styles={[resetStyle, globalStyle]} />
        <GlobalProvider>
          <Story />
        </GlobalProvider>
      </QueryClientProvider>
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
