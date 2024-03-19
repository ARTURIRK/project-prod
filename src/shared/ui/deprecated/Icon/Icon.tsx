import { SVGProps, VFC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface Props extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export function Icon({ className, Svg, inverted, ...props }: Props) {
    return (
        <Svg
            {...props}
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
            ])}
        />
    );
}
