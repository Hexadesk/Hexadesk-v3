import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async (boardId) => {
  try {
    const res = await axios.get(`/list/${boardId}`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const useGetBoardLists = (boardId) => {
  const { data, isLoading } = useQuery(
    ["get-all-board-list", boardId],
    () => fetchInfo(boardId),
    {
      refetchOnWindowFocus: true,
      retry: true,
    }
  );

  return {
    boardList: data?.list ?? [],
    isLoading,
  };
};
