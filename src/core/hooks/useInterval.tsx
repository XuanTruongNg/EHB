import { useEffect, useLayoutEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    //TODO: handle consistent return
    // eslint-disable-next-line consistent-return
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
