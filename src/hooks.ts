import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "./api/client";

/** Runs an async loader and tracks loading / error state. */
export function useFetch<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    loader().then(setData).catch((e) => setError(errorMessage(e))).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(load, [load]);
  return { data, loading, error, reload: load, setData };
}
