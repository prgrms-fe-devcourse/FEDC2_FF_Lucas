import Text from "../../components/Text/Text";

export default {
  title: "Component/Text",
  component: Text,
  argTypes: {
    block: { control: "boolean" },
    size: { control: "number" },
    strong: { control: "boolean" },
    underline: { control: "boolean" },
    color: { control: "color" },
  },
};

export const Default = args => <Text {...args}>Text</Text>;
