import Card from "../../components/Card/Card";

export default {
  title: "Component/Card",
  component: Card,
  argTypes: {
    width: {
      defaultValue: 500,
      control: "number",
    },
    src: {
      type: { name: "string", require: true },
      defaultValue: "https://picsum.photos/200",
      control: { type: "text" },
    },
    date: {
      defaultValue: "22.06.13",
      control: { type: "text" },
    },
    userName: {
      defaultValue: "미대생 영이",
      control: { type: "text" },
    },
    title: {
      defaultValue: "아무말이나 잔뜩 써놨지만 대충 인스타 감성이라는 뜻",
      control: { type: "text" },
    },
    commentCount: {
      defaultValue: 36,
      control: "number",
    },
    likeCount: {
      defaultValue: 3,
      control: "number",
    },
  },
};

export function Default(args) {
  return <Card {...args} />;
}
