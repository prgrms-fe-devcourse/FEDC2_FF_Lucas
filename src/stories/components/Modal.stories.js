import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export default {
  title: "Component/Modal",
  component: Modal,
  argTypes: {
    width: {
      defaultValue: 500,
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
};

export const Default = args => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick={() => setVisible(true)}>Show</button>
      <Modal visible={visible} onClose={() => setVisible(false)} {...args}>
        Modal 창입니다
      </Modal>
    </>
  );
};
