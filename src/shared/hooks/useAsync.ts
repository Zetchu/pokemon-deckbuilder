import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_DEPS: unknown[] = [];

export default function useAsync<Type>(
  fn: (initial: boolean) => Promise<Type>,
  deps: unknown[] = DEFAULT_DEPS
): [
  Type | undefined,
  {
    refresh: () => void;
  },
] {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });

  const [promise, setPromise] = useState<Promise<Type>>();
  const startedRef = useRef(false);

  useEffect(() => {
    if (deps.length === 0 && startedRef.current) return;
    startedRef.current = true;

    setPromise(fnRef.current(true));
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    setPromise(fnRef.current(false));
  }, []);

  const value = promise ? use(promise) : undefined;

  const result = useMemo(
    () => [value, { refresh }] as [Type | undefined, { refresh: () => void }],
    [value, refresh]
  );

  return result;
}
