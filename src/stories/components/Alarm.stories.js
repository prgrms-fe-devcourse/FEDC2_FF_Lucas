import Alarm from "../../components/Alarm/Alarm";

export default {
  title: "Component/Alarm",
  component: Alarm,
  argsTypes: {
    // alarm: {
    //   type: { name: "string", require: true },
    //   defaultValue: "https://picsum.photos/200",
    //   control: { type: "text" },
    // },
    type: {
      defaultValue: "text",
      options: ["text", "checkbox", "email", "password", "submit"],
      control: { type: "radio" },
    },
  },
};

export function Default(args) {
  return <Alarm {...args} />;
}
