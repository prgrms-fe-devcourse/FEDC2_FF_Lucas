import axios from "axios";

const createLike = async (postId, token) => {
  if (!postId || !token) {
    alert("no postId OR no token", postId, token);
    return undefined;
  }

  return axios.post(
    "/likes/create",
    { postId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

const deleteLike = async (id, token) => {
  if (!id || !token) {
    alert("no Id OR no token", id, token);
    return;
  }

  axios.delete("/likes/delete", {
    data: { id },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { createLike, deleteLike };
