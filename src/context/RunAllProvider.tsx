import { useCallback, useMemo, useState, type ReactNode } from "react";
import { RunAllContext } from "./RunAll";

export function RunAllProvider({ children }: { children: ReactNode }) {
  const [runAllId, setRunAllId] = useState(0);
  const runAll = useCallback(() => setRunAllId((n) => n + 1), []);
  const value = useMemo(() => ({ runAllId, runAll }), [runAllId, runAll]);
  return <RunAllContext.Provider value={value}>{children}</RunAllContext.Provider>;
}