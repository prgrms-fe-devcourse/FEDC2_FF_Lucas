import { useQuery } from "react-query";
import axios from "axios";

const useGetUsers = ({ token }) => {
  const formData = new FormData();

  return useQuery("/users/get-users", async () => {
    const { data } = await axios.post(`/users/get-users`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });
};

const useSignup = id =>
  useQuery(`/signup/${id}`, async ({ email, fullName, password }) => {
    const { data } = await axios({
      method: "POST",
      url: "/signup",
      data: {
        email,
        fullName,
        password,
      },
    });
    return data;
  });

const useLogin = id =>
  useQuery(`/login/${id}`, async ({ email, password }) => {
    const { data } = await axios({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    });
    return data;
  });

const useLogout = id =>
  useQuery(`/logout/${id}`, async () => {
    const { data } = await axios({
      method: "POST",
      url: "/logout",
    });
    return data;
  });

const useGetUser = (userId = "") =>
  useQuery(`/users/${userId}`, async () => {
    const { data } = await axios({
      method: "GET",
      url: `/users/${userId}`,
    });
    return data;
  });

export { useGetUsers, useLogin, useLogout, useSignup, useGetUser };
