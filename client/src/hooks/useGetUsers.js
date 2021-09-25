import axios from "axios";
import { useQuery } from "react-query";

const fetchInfo = async () => {
  try {
    const res = await axios.get(`/auth/users`);
    return res.data?.users;
  } catch (err) {
    throw err.response;
  }
};

export const useGetUsers = () => {
  const { data, isLoading, isError } = useQuery("get-all-users", fetchInfo, {
    refetchOnWindowFocus: true,
    retry: true,
  });
  let users = [];

  if (!isLoading && !isError) {
    data?.map(({ email, _id, ...rest }) =>
      users.push({ label: email, value: email, ...rest })
    );
  }

  return {
    users: users ?? [],
    isLoadingUsers: isLoading,
  };
};
