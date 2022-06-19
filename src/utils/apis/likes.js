import axios from "axios";

const createLike = async postId => {
  if (!postId) {
    alert("no postId ", postId);
    return undefined;
  }

  return axios.post("/likes/create", {
    // headers: { Authorization: `Bearer ${token}` },
    data: { postId },
  });
};

const deleteLike = async id => {
  if (!id) {
    alert("no Id ", id);
    return undefined;
  }

  return axios.delete("/likes/delete", {
    // headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
};

export { createLike, deleteLike };
