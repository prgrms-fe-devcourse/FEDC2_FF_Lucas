import { useQuery } from "react-query";
import axios from "axios";

const useGetChannelByName = ({ name = "" }) =>
  useQuery("/channels/get-channel-by-name", async () => {
    const { data } = await axios({
      method: "GET",
      url: `/channels/${name}`,
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

export { useGetChannelList, useGetChannelByName };
