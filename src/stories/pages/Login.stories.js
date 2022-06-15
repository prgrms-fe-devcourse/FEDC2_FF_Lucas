import Login from "../../pages/Login/Login";

export default {
  title: "Page/Login",
  component: Login,
  argTypes: {
    onSubmit: { action: "onSubmit" },
  },
};

export const Default = args => <Login {...args} />;
