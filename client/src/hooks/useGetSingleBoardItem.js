import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async (itemId) => {
  try {
    const res = await axios.get(`/item/${itemId}`);
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const useGetSingleBoardItem = (itemId) => {
  const { data, isLoading } = useQuery(
    ["useGetSingleBoardItem", itemId],
    () => fetchInfo(itemId),
    {
      refetchOnWindowFocus: true,
      retry: true,
    }
  );

  return {
    itemData: data?.item ?? {},
    isLoading,
  };
};
