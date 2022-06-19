import Alarm from "../../../pages/Alarm/AlarmPage";

export default {
  title: "Page/Alarm",
  component: Alarm,
  argTypes: {
    onSubmit: { action: "onSubmit" },
  },
};

export const Default = args => <Alarm {...args} />;
