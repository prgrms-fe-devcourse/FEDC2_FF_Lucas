import LowerHeader from "../../components/Header/LowerHeader";

export default {
  title: "Component/LowerHeader",
  component: LowerHeader,
  argTypes: {
    level: { control: { type: "range", min: 1, max: 6 } },
    strong: { control: "boolean" },
    underline: { control: "boolean" },
    color: { control: "color" },
  },
};

export function Default() {
  return <LowerHeader />;
}
