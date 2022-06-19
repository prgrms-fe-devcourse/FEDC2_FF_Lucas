import { useReducer, createContext, useMemo, useContext } from "react";
import { PropTypes } from "prop-types";

const initialState = {
  userInfo: null,
  channels: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
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

  const setUser = async userInfo => {
    dispatch({ type: "SET_USER", userInfo });
  };

  const setChannels = channels =>
    dispatch({
      type: "SET_CHANNELS",
      channels,
    });

  const provideValue = useMemo(
    () => ({ state, dispatch, setUser, setChannels }),
    [state, dispatch],
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
