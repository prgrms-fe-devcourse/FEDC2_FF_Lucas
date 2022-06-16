import { useQuery } from "react-query";

import axios from "axios";

const useGetUsers = () =>
  useQuery("/users/get-users", async () => {
    const { data } = await axios.get("/users/get-users");
    return data;
  });

const useTest = id =>
  useQuery(`/users/get-users/${id}`, async () => {
    const { data } = await axios.get(`/users/get-users`);
    return data;
  });

export { useGetUsers, useTest };
