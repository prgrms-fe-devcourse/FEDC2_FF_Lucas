import useForm from "../../hooks/useForm";

export default {
  title: "Hook/useForm",
  component: useForm,
  argTypes: {},
};

export const Default = () => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      text: "",
    },
    onSubmit: async values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values));
    },
    validate: ({ text }) => {
      const error = {};
      if (!text) {
        error.text = "텍스트를 입력해주세요!";
      }
      return error;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="text"
          type="text"
          placeholder="text"
          onChange={handleChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
      {errors.text}
    </form>
  );
};
