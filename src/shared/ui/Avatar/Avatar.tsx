import { useMemo, CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import AvatarIcon from '@/shared/assets/icons/avatar.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface Props {
    fallbackInverted?: boolean;
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export function Avatar({
    className,
    src,
    size = 100,
    alt,
    fallbackInverted,
}: Props) {
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            width={size}
            height={size}
            Svg={AvatarIcon}
        />
    );
    const fallback = (
        <Skeleton
            width={size}
            height={size}
            border="50%"
        />
    );
    return (
        <AppImage
            className={classNames(cls.Avatar, {}, [className])}
            errorFallback={errorFallback}
            fallback={fallback}
            style={styles}
            src={src}
            alt={alt}
        />
    );
}
