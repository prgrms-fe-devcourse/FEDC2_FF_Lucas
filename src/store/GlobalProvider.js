import { useReducer, createContext, useMemo, useContext } from "react";
import { PropTypes } from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const FF_USER_TOKEN = "FF_USER_TOKEN";

const initialState = {
  userInfo: null,
  channels: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      // logout 할때
      if (action.userInfo === null) {
        action.removeStoredToken();
        action.setStoredToken("");
      }

      // login 성공해서 token이 return될때
      if (action.userInfo && action.userInfo.token)
        action.setStoredToken(action.userInfo.token);

      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case "SET_CHANNELS": {
      return {
        ...state,
        channels: action.channels,
      };
    }
    default:
      return state;
  }
};

const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [storedToken, setStoredToken, removeStoredToken] = useLocalStorage(
    FF_USER_TOKEN,
    null,
  );

  console.log("create global", state, storedToken);

  const setUser = async userInfo => {
    dispatch({ type: "SET_USER", userInfo, setStoredToken, removeStoredToken });
  };

  const setChannels = channels =>
    dispatch({
      type: "SET_CHANNELS",
      channels,
    });

  const provideValue = useMemo(
    () => ({ state, storedToken, dispatch, setUser, setChannels }),
    [state, storedToken, dispatch],
  );

  return (
    <GlobalContext.Provider value={provideValue}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
