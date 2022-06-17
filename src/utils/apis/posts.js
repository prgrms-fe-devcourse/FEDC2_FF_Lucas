import { useQuery } from "react-query";
import axios from "axios";

const useGetPosts = ({ chanelId, offset, limit }) =>
  useQuery("/posts/channel", async () => {
    const { data } = await axios.get(`/posts/channel/${chanelId}`, { params: { offset, limit } });
    return data;
  });

const useGetPostsByAuthorId = ({ authorId, offset, limit }) =>
  useQuery("/posts/author", async () => {
    const { data } = await axios.get(`/posts/author/${authorId}`, { params: { offset, limit } });
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

const createPost = async ({ title, image, channelId, token }) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);
  formData.append("channelId", channelId);

  axios.post(`/posts/create/`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { useGetPosts, useGetPostsByAuthorId, useCreatePost, useGetPostByPostId, createPost };
