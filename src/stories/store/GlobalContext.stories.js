import { useGlobalContext } from "../../store/GlobalProvider";

export default {
  title: "Component/GlobalContext",
  argTypes: {},
};

export const Default = () => {
  const { state, dispatch, deleteTodo, setUser, setChannels } = useGlobalContext();
  const userData = {
    user: "user",
    token: "1234",
  };
  const channels = [
    {
      name: "채널1",
    },
    {
      name: "채널2",
    },
    {
      name: "채널3",
    },
  ];

  const addTodo = text =>
    dispatch({
      type: "ADD_TODO",
      text,
    });

  return (
    <>
      <button type="button" onClick={() => addTodo("Hello")}>
        Add
      </button>
      <button type="button" onClick={() => deleteTodo(2)}>
        delete
      </button>
      <button type="button" onClick={() => setUser(userData)}>
        setUser
      </button>
      <button type="button" onClick={() => setChannels(channels)}>
        set channel
      </button>
      <ul>
        {state.todos.map(todo => (
          <li>{todo.todo}</li>
        ))}
      </ul>
      <div>
        {state.userInfo && state.userInfo.user} {state.userInfo && state.userInfo.token}
      </div>
      <ul>
        {state.channels.map(channel => (
          <li>{channel.name}</li>
        ))}
      </ul>
    </>
  );
};
