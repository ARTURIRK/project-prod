import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface Props extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    target?: HTMLAttributeAnchorTarget;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = memo((props: Props) => {
    const {
        to,
        className,
        children,
        target,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            target={target}
            to={to}
            className={classNames(cls.AppLink, { [cls[theme]]: true }, [
                className,
            ])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
