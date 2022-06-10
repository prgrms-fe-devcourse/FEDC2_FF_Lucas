import Input from "../../components/Input/Input";

export default {
  title: "Component/Input",
  component: Input,
  argTypes: {
    label: {
      defaultValue: "",
      control: "text",
    },
    type: {
      defaultValue: "text",
      options: ["text", "checkbox", "email", "password", "submit"],
      control: { type: "radio" },
    },
    block: {
      defaultValue: false,
      control: "boolean",
    },
    invalid: {
      defaultValue: false,
      control: "boolean",
    },
    required: {
      defaultValue: false,
      control: "boolean",
    },
    disabled: {
      defaultValue: false,
      control: "boolean",
    },
    readonly: {
      defaultValue: false,
      control: "boolean",
    },
    maxLength: {
      defaultValue: 7,
      control: "number",
    },
    placeholder: {
      defaultValue: "Email",
      control: "text",
    },
    wrapperProps: {
      defaultValue: {},
    },
    wrapperStyles: {
      defaultValue: {},
    },
    labelStyles: {
      defaultValue: {},
    },
    inputStyles: {
      defaultValue: {},
    },
  },
};

export const Default = args => <Input {...args} />;
