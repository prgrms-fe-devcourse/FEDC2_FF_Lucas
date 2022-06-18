import { Global } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import resetStyle from "./styles/reset";
import globalStyle from "./styles/style";
import MainPage from "./pages/MainPage/MainPage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useGetChannelList } from "./utils/apis/channels";
import { useGlobalContext } from "./store/GlobalProvider";
import WritingPostPage from "./pages/Post/WritingPostPage";

axios.defaults.baseURL = `http://kdt.frontend.2nd.programmers.co.kr:5006`;

function App() {
  const { setChannels } = useGlobalContext();
  const { data: channels } = useGetChannelList();

  useEffect(() => {
    setChannels(channels);
  }, [channels]);

  return (
    <div className="App">
      <Global styles={[resetStyle, globalStyle]} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="write" element={<WritingPostPage />} />
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
