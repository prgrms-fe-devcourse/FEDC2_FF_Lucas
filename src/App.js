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
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import { useGetAuthUser } from "./utils/apis/auth";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import AlarmPage from "./pages/Alarm/AlarmPage";
import ProtectedRoute from "./routes/ProtectedRoute";

axios.defaults.baseURL = `http://kdt.frontend.2nd.programmers.co.kr:5006`;

function App() {
  const { storedToken, setChannels, setUser } = useGlobalContext();
  const { data: channels } = useGetChannelList();

  const { data: userInfo } = useGetAuthUser({ token: storedToken });

  useEffect(() => {
    if (!channels) return;

    setChannels(channels);
  }, [channels]);

  useEffect(() => {
    if (!userInfo) return;

    setUser({ user: userInfo, token: storedToken });
  }, [userInfo]);

  return (
    <div className="App">
      <Global styles={[resetStyle, globalStyle]} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="write" element={<WritingPostPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="alarm" element={<AlarmPage />} />
          <Route
            path="write"
            element={
              <ProtectedRoute>
                <WritingPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
