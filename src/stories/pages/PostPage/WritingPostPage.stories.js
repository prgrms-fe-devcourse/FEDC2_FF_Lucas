import { useEffect } from "react";
import WritingPostPage from "../../../pages/Post/WritingPostPage";
import { useGetChannelList } from "../../../utils/apis/channels";
import { useGlobalContext } from "../../../store/GlobalProvider";

export default {
  title: "Page/WitePostingPage",
  component: WritingPostPage,
};

export const Default = args => {
  const { setChannels } = useGlobalContext();
  const { data: channels } = useGetChannelList();

  useEffect(() => {
    setChannels(channels);
  }, [channels]);

  return <WritingPostPage {...args} />;
};
