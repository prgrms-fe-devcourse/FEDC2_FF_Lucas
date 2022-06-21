import { useQuery } from "react-query";
import axios from "axios";

const useGetAlarmList = ({ token }) =>
  useQuery("/get/notifications/", async () => {
    const { data } = await axios.get(`/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });

const useReadAlarm = ({ token }) =>
  useQuery("/get/notification/seen", async () => {
    const { data } = await axios.get(`notifications/seen`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  });

const useCreateAlarm = ({
  token,
  notificationType,
  notificationTypeId,
  userId,
  postId,
}) =>
  useQuery(
    `/post/notifications/create/${notificationTypeId}`,
    async () => {
      const { data } = await axios.post(
        `notifications/create`,
        {
          notificationType,
          notificationTypeId,
          userId,
          postId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    },
    {
      enabled: !!notificationType,
      notificationTypeId,
      userId,
      postId,
    },
  );

export { useGetAlarmList, useCreateAlarm, useReadAlarm };
