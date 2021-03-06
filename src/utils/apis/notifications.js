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
  useQuery(
    "/put/notification/seen",
    async () => {
      const { data } = await axios.put(
        `notifications/seen`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return data;
    },
    {
      enabled: false,
    },
  );

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
      enabled: !!notificationTypeId,
    },
  );

export { useGetAlarmList, useCreateAlarm, useReadAlarm };
