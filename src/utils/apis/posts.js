import { useQuery } from "react-query";
import axios from "axios";

const useGetPosts = ({ channelId, offset = 0, limit, key = "" }) =>
  useQuery(
    [`/posts/channel/${channelId}${key}`, offset],
    async () => {
      const { data } = await axios.get(`/posts/channel/${channelId}`, {
        params: limit ? { offset, limit } : { offset },
      });
      return data;
    },
    {
      enabled: !!channelId,
    },
  );

const useGetPostsByAuthorId = ({ authorId, offset, limit }) =>
  useQuery("/posts/author", async () => {
    const { data } = await axios.get(`/posts/author/${authorId}`, {
      params: { offset, limit },
    });
    return data;
  });

const useCreatePost = ({ title, image, channelId, token }) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);
  formData.append("channelId", channelId);

  return useQuery("/posts/create", async () => {
    const { data } = await axios.post(`/posts/create/`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  });
};

const useGetPostByPostId = ({ postId }) =>
  useQuery("/posts/postId", async () => {
    const { data } = await axios.get(`/posts/${postId}`);

    return data;
  });

const useUpdatePost = ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
  token,
}) => {
  const formData = new FormData();

  formData.append("postId", postId);
  formData.append("title", title);
  formData.append("image", image);
  formData.append("channelId", channelId);
  imageToDeletePublicId &&
    formData.append("imageToDeletePublicId", imageToDeletePublicId);

  return useQuery("/posts/update", async () => {
    const { data } = await axios.put(`/posts/update`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  });
};

const useDeletePostById = ({ id, token }) =>
  useQuery(
    "/posts/delete",
    axios.delete(`/posts/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { id },
    }),
  );

const createPost = async ({
  title = "",
  image = null,
  channelId = "",
  token = "",
}) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);
  formData.append("channelId", channelId);

  return axios.post(`/posts/create/`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updatePost = async ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
  token,
}) => {
  const formData = new FormData();

  formData.append("postId", postId);
  formData.append("title", title);
  formData.append("image", image);
  formData.append("channelId", channelId);
  imageToDeletePublicId &&
    formData.append("imageToDeletePublicId", imageToDeletePublicId);

  await axios.put(`/posts/update`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const useGetAllPost = () =>
  useQuery("/posts", async () => {
    const { data } = await axios.get(`/posts`);
    return data;
  });

export {
  useGetPosts,
  useGetPostsByAuthorId,
  useCreatePost,
  useGetPostByPostId,
  useUpdatePost,
  useDeletePostById,
  createPost,
  updatePost,
  useGetAllPost,
};
