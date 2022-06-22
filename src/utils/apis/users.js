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

const updateProfileImage = async ({ image = "", token = "" }) => {
  const formData = new FormData();

  formData.append("isCover", false);
  formData.append("image", image);

  const { data } = await axios.post(`/users/upload-photo`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

const updateUserInfo = async ({ fullName, username, token }) => {
  const { data } = await axios({
    method: "PUT",
    url: "/settings/update-user",
    headers: { Authorization: `Bearer ${token}` },
    data: {
      fullName,
      username,
    },
  });

  return data;
};

export {
  useGetUsers,
  useLogin,
  useLogout,
  useSignup,
  useGetUser,
  updateProfileImage,
  updateUserInfo,
};
