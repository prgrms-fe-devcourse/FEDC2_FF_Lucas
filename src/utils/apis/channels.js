/* eslint-disable import/prefer-default-export */
import { useQuery } from "react-query";

import axios from "axios";

const useGetChannels = () =>
  useQuery("/channels/get-posts", async ({ channelId }) => {
    const { data } = await axios({
      method: "GET",
      url: `/channels`,
      data: {
        channelId,
      },
    });
    return data;
  });

const useGetChannelList = () =>
  useQuery("/channels/get-channel-list", async () => {
    const { data } = await axios({
      method: "GET",
      url: `/channels`,
    });
    return data;
  });

export { useGetChannels, useGetChannelList };
