import { useGlobalContext } from "../../store/GlobalProvider";

export default {
  title: "Component/GlobalContext",
  argTypes: {},
};

export const Default = () => {
  const { state, dispatch, deleteTodo } = useGlobalContext();

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
      <ul>
        {state.todos.map(todo => (
          <li>{todo.todo}</li>
        ))}
      </ul>
    </>
  );
};
