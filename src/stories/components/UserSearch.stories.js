import UserSearch from "../../components/UserSearch/UserSearch";

export default {
  title: "Component/UserSearch",
  component: UserSearch,
  argsTypes: {
    type: {
      defaultValue: "text",
      options: ["text", "checkbox", "email", "password", "submit"],
      control: { type: "radio" },
    },
  },
};

export function Default(args) {
  return <UserSearch {...args} />;
}
