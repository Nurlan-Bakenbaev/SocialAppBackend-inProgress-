import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollow = () => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);

  const { mutate: followUnFollow, isLoading, error } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/follow/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const data = await res.json();
        toast.success("User followed successfully");
        return data;
      } catch (error) {
        toast.error(error.error || "Couldn't follow");
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(["suggestedUsers"]),
        queryClient.invalidateQueries(["authUser"]),
      ]);
    },
  });

  return { followUnFollow, isPending: isLoading, error };
};

export default useFollow;
