import { useEffect, useState } from "react";
import { useGlobalContext } from "../store/GlobalProvider";
import { getAuthUser } from "../utils/apis/auth";

const useCheckAuthUser = () => {
  const { state } = useGlobalContext();
  const [isAuthUser, setAuthUser] = useState(false);

  useEffect(() => {
    if (!state.userInfo) {
      setAuthUser(false);

      return;
    }

    const checkToken = async () => {
      const authUser = await getAuthUser({
        token: state.userInfo.token || "NoToken",
      });

      if (authUser) {
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    };

    checkToken();
  }, [state.userInfo]);

  return { isAuthUser };
};

export default useCheckAuthUser;
