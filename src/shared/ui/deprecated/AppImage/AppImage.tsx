import {
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppImage = memo(
    ({
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...props
    }: Props) => {
        const [isLoading, setIsLoading] = useState(true);
        const [isError, setIsError] = useState(false);
        useLayoutEffect(() => {
            const img = new Image();
            img.src = src ?? '';
            img.onload = () => {
                setIsLoading(false);
            };
            img.onerror = () => {
                setIsLoading(false);
                setIsError(true);
            };
        }, [src]);
        if (isLoading && fallback) {
            return fallback;
        }

        if (isError && errorFallback) {
            return errorFallback;
        }
        return (
            <img
                className={className}
                src={src}
                alt={alt}
                {...props}
            />
        );
    },
);
