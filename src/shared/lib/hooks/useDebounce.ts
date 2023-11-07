import {
    MutableRefObject, useCallback, useRef,
} from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timerId = useRef() as MutableRefObject<any>;

    return useCallback((...args: any[]) => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}
