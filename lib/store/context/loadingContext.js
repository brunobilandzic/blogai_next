import { createContext } from "react";

export const LoadingContext = createContext({
  onStop: () => {},
  setOnStop: () => {},
});
