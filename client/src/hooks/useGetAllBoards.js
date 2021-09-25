import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async () => {
  try {
    const res = await axios.get(`/board`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const useGetAllBoards = () => {
  const { data, isLoading } = useQuery("get-all-boards", fetchInfo, {
    refetchOnWindowFocus: true,
    retry: true,
  });
  return {
    personalBoards: data?.myBoards ?? [],
    teamsBoards: data?.otherRoleBoards ?? [],
    isLoading,
  };
};
