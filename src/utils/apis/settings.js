import { useQuery } from "react-query";
import axios from "axios";

const useUpdatePassword = ({ token }) => {
  const formData = new FormData();

  return useQuery("/settings/update-password", async ({ password }) => {
    const { data } = await axios.put(`/settings/update-password`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        password,
      },
    });

    return data;
  });
};

const useUpdateUser = ({ token }) => {
  const formData = new FormData();

  return useQuery("/settings/update-user", async ({ fullName, userName }) => {
    const { data } = await axios.put(`/settings/update-user`, formData, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        fullName,
        userName,
      },
    });

    return data;
  });
};

export { useUpdatePassword, useUpdateUser };
