import { useQuery } from "react-query";
import axios from "axios";

const useGetAuthUser = ({ token = "NoToken" }) =>
  useQuery(["/auth-user", token], async () => {
    const { data } = await axios.get(`/auth-user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });

const getAuthUser = async ({ token = "NoToken" }) => {
  const { data } = await axios.get(`/auth-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export { useGetAuthUser, getAuthUser };
