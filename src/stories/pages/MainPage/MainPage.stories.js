import MainPage from "../../../pages/MainPage/MainPage";

export default {
  title: "Page/MainPage",
  component: MainPage,
  argTypes: {
    height: {
      defaultValue: 500,
      control: "number",
    },
    second: {
      defaultValue: 3000,
      control: "number",
    },
  },
};

export function Default(args) {
  return <MainPage {...args} />;
}
