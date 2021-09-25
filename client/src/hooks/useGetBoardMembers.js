import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async (boardId) => {
  try {
    const res = await axios.get(`/board/${boardId}/members`);
    return res.data?.members;
  } catch (err) {
    throw err.response;
  }
};

export const useGetBoardMembers = ({ boardId }) => {
  const { data, isLoading, isError } = useQuery(
    "useGetBoardMembers",
    () => fetchInfo(boardId),
    {
      refetchOnWindowFocus: true,
      retry: true,
    }
  );
  let users = [];

  if (!isLoading && !isError) {
    data?.map(({ name, email, _id, ...rest }) =>
      users.push({
        label: `${name} - ${email}`,
        email,
        value: _id,
        id: _id,
        ...rest,
      })
    );
  }

  return {
    users: users ?? [],
    isLoadingUsers: isLoading,
  };
};
