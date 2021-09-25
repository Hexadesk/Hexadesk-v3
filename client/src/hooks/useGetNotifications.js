import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async () => {
  try {
    const res = await axios.get(`/notification`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const useGetNotifications = () => {
  const { data, isLoading } = useQuery("useGetNotifications", fetchInfo, {
    refetchOnWindowFocus: true,
    retry: true,
  });

  return {
    notificationData: data ?? {},
    isLoading,
  };
};
