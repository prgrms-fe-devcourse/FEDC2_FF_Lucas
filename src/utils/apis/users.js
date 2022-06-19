import { useQuery } from "react-query";

import axios from "axios";

const useGetUsers = () =>
  useQuery("/users/get-users", async () => {
    const { data } = await axios.get("/users/get-users");
    return data;
  });

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

export { useGetUsers, useLogin, useLogout, useSignup };
