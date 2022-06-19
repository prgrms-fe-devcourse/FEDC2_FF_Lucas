import { useQuery } from "react-query";
import axios from "axios";

const useGetAuthUser = ({ token = "NoToken" }) =>
  useQuery("/auth-user", async () => {
    const { data } = await axios.get(`/auth-user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });

export default useGetAuthUser;
