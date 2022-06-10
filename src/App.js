import { Global } from "@emotion/react";
import resetStyle from "./styles/reset";
import globalStyle from "./styles/style";

function App() {
  return (
    <div className="App">
      <Global styles={[resetStyle, globalStyle]} />
      FF
    </div>
  );
}

export default App;
