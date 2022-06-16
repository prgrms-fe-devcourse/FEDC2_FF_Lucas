import { Global } from "@emotion/react";
import axios from "axios";
import resetStyle from "./styles/reset";
import globalStyle from "./styles/style";

axios.defaults.baseURL = `http://kdt.frontend.2nd.programmers.co.kr:5006`;

function App() {
  return (
    <div className="App">
      <Global styles={[resetStyle, globalStyle]} />
      FF
    </div>
  );
}

export default App;
