import Select from "../../components/Select/Select";

export default {
  title: "Component/Select",
  component: Select,
  argTypes: {
    label: {
      defaultValue: "Label",
      control: "text",
    },
    placeholder: {
      defaultValue: "Placeholder",
      control: "text",
    },
    invalid: {
      defaultValue: false,
      control: "boolean",
    },
    disabled: {
      defaultValue: false,
      control: "boolean",
    },
    required: {
      defaultValue: false,
      control: "boolean",
    },
  },
};

export const Default = args => (
  <Select
    data={[
      { label: "채널1", value: "id1" },
      { label: "채널2", value: "id2" },
      { label: "채널3", value: "id3" },
    ]}
    {...args}
  />
);
