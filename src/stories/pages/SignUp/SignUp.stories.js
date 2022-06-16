import SignUp from "../../../pages/SignUp/SignUp";

export default {
  title: "Page/SignUp",
  component: SignUp,
  argTypes: {
    onSubmit: { action: "onSubmit" },
  },
};

export const Default = args => <SignUp {...args} />;
