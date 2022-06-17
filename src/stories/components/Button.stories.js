import { Heart } from "react-feather";
import Button from "../../components/Button/Button";
import Common from "../../styles/common";

export default {
  title: "Component/Button",
  component: Button,
  argTypes: {
    width: {
      control: {
        type: "range",
        min: 100,
        max: 500,
        step: 10,
      },
    },
    height: {
      control: {
        type: "range",
        min: 10,
        max: 100,
        step: 10,
      },
    },
    color: {
      options: ["#dddfeb", "black", "white"],
      control: "select",
    },
    backgroundColor: {
      options: [`${Common.colors.mainColor}`, "white"],
      control: "select",
    },
    onClick: { action: "onClick" },
    borderColor: {
      options: ["black", "white"],
      control: "select",
    },
    borderRadius: { control: "text" },
    borderWidth: { control: "text" },
    children: { control: "text" },
  },
};

export const Default = args => <Button {...args}>버튼</Button>;

export const IconButton = args => (
  <Button {...args}>
    <Heart />
  </Button>
);
