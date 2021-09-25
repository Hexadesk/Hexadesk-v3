import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const fetchInfo = async (boardId) => {
  try {
    const res = await axios.get(`/item/board/${boardId}`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const useGetBoardItems = (boardId) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, isFetching } = useQuery(
    ["useGetBoardItems", boardId],
    () => fetchInfo(boardId),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  );

  return {
    boardItems: data?.items ?? [],
    isLoading,
  };
};
