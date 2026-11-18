import { createContext, useContext } from "react";

export type RunAllValue = {
  runAllId: number; // goes up by one every time "Run all" is pressed
  runAll: () => void;
};

export const RunAllContext = createContext<RunAllValue>({
  runAllId: 0,
  runAll: () => {},
});

export const useRunAll = () => useContext(RunAllContext);