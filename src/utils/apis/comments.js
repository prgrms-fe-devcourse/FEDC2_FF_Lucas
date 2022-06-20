import axios from "axios";

const createComment = async (comment, postId, token) => {
  if (!postId || !token) {
    alert("no postId OR no token", postId, token);
    return undefined;
  }

  return axios.post(
    "/comments/create",
    { comment, postId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

const deleteComment = async (id, token) => {
  if (!id || !token) {
    alert("no Id OR no token", id, token);
    return;
  }

  axios.delete("/comments/delete", {
    data: { id },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { createComment, deleteComment };
