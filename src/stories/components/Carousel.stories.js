import Carousel from "../../components/Carousel/Carousel";

export default {
  title: "Component/Carousel",
  component: Carousel,
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
  return <Carousel {...args} />;
}
