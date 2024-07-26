import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

interface AppContext {
  showToast: (toastMessage: ToastMessage) => void;
}

interface ToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
}

const AppContext = createContext<AppContext | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
