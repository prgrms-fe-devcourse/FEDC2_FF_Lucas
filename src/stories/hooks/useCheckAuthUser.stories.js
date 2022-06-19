import useCheckAuthUser from "../../hooks/useCheckAuthUser";
import Login from "../../pages/Login/Login";
import { useGlobalContext } from "../../store/GlobalProvider";

export default {
  title: "Hook/useCheckAuthUser",
  component: useCheckAuthUser,
  argTypes: {},
};

export const Default = () => {
  const { isAuthUser } = useCheckAuthUser();
  const { state } = useGlobalContext();

  return (
    <div>
      <h1>{isAuthUser ? "인증됨" : "노인증"}</h1>
      <h1>
        글로벌 상태에 저장된 유저 이름 :
        {state.userInfo && state.userInfo.user.fullName}
      </h1>
      <Login />
    </div>
  );
};
