import { useMemo, CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import AvatarIcon from '@/shared/assets/icons/new-avatar.svg';
import { Icon } from '../../redesigned/Icon';
import { Skeleton } from '../Skeleton';

interface Props {
    fallbackInverted?: boolean;
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
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
