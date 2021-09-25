import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async () => {
  try {
    const res = await axios.get(`/profile`);
    return res.data?.profile;
  } catch (err) {
    throw err.response;
  }
};

export const useGetProfile = () => {
  const { data, isLoading } = useQuery("useGetProfile", fetchInfo, {
    refetchOnWindowFocus: true,
    retry: true,
  });

  return {
    profileData: data ?? {},
    isLoading,
  };
};
