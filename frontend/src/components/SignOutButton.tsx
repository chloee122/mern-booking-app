import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import useAppContext from "../hook/useAppContext";

function SignOutButton() {
  const { showToast } = useAppContext();
  const mutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      showToast({ message: "Signed out!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const queryClient = useQueryClient();

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
