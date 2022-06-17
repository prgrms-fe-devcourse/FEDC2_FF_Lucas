import { useQuery } from "react-query";
import axios from "axios";

const useGetPosts = ({ chanelId, offset, limit }) =>
  useQuery("/posts/channel", async () => {
    const { data } = await axios.get(`/posts/channel/${chanelId}`, { params: { offset, limit } });
    return data;
  });

export default useGetPosts;
