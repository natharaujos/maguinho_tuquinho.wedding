import { createContext } from "react";

export const LoadingContext = createContext<{
  loading: boolean;
  setNavigationLoading: (loading: boolean) => void;
}>({ loading: false, setNavigationLoading: () => {} });
