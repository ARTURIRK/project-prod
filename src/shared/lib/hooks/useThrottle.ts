import { useCallback, useEffect, useRef } from 'react';

let timerId: ReturnType<typeof setTimeout>;
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false);
    useEffect(() => () => (timerId ? clearTimeout(timerId) : undefined), []);
    return useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true;
                timerId = setTimeout(() => {
                    throttleRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
}
