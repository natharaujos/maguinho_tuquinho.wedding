import { createContext, useContext, useState } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoadingWithDelay: (value: boolean, delay?: number) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoadingWithDelay: () => {},
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setNavigationLoading] = useState(false);

  function setLoadingWithDelay(value: boolean, delay = 2000) {
    if (!value) {
      setTimeout(() => setNavigationLoading(false), delay);
    } else {
      setNavigationLoading(true);
    }
  }

  return (
    <LoadingContext.Provider value={{ loading, setLoadingWithDelay }}>
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

const useLoading = () => useContext(LoadingContext);

export { useLoading, LoadingContext, LoadingProvider };
