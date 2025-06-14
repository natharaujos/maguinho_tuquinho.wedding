import { useState } from "react";
import { LoadingContext } from "./LoadingContext";

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setNavigationLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setNavigationLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <span className="text-blue-600 animate-pulse text-xl">
            Carregando...
          </span>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
