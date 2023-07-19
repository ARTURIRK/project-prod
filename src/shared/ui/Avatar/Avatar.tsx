import { useMemo, CSSProperties } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface Props {
 className?: string;
 src?: string;
 size?: number;
 alt?: string
}

export function Avatar({
    className, src, size, alt,
}: Props) {
    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);
    return (
        <img src={src} style={styles} className={classNames(cls.Avatar, {}, [className])} alt={alt || 'IMG'} />
    );
}
