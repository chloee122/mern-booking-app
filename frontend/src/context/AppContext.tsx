import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";

export interface AppContextType {
  showToast: (toastMessage: ToastMessage) => void;
  isCheckingIfLoggedIn: boolean;
  isLoggedIn: boolean;
}

interface ToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const { isPending, isSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isCheckingIfLoggedIn: isPending,
        isLoggedIn: isSuccess,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}
