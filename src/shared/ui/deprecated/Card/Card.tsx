import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}
interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    theme?: CardTheme;
    children: ReactNode;
    fullWidth?: boolean;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Card = memo(
    ({
        className,
        children,
        theme = CardTheme.NORMAL,
        fullWidth,
        ...otherProps
    }: Props) => (
        <div
            className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [
                className,
                cls[theme],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    ),
);
