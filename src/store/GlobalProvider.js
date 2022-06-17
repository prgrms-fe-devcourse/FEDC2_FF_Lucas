import { useReducer, createContext, useMemo, useContext } from "react";
import { PropTypes } from "prop-types";

const initialState = {
  todos: [
    { id: 1, todo: "create context" },
    { id: 2, todo: "provide context" },
  ],
  userInfo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case "ADD_TODO": {
      return {
        ...state,
        todos: state.todos.concat({ id: 4, todo: action.text }),
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter(todo => action.id !== todo.id),
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

  const deleteTodo = id =>
    dispatch({
      type: "DELETE_TODO",
      id,
    });

  const provideValue = useMemo(
    () => ({ state, dispatch, deleteTodo, setUser }),
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
