import { useQuery } from "react-query";
import axios from "axios";

const useFollow = ({ token }) => {
  const formData = new FormData();

  return useQuery("/follow/create", async ({ userId }) => {
    const { data } = await axios.post(`/follow/create`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId,
      },
    });

    return data;
  });
};

export default useFollow;
