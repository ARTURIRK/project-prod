import { classNames } from 'shared/lib/classNames/classNames';
import { SVGProps, VFC } from 'react';
import cls from './Icon.module.scss';

interface Props {
 className?: string;
 Svg: VFC<SVGProps<SVGSVGElement>>;
}

export function Icon({ className, Svg }: Props) {
    return (
        <Svg className={classNames(cls.Icon, {}, [className])}> </Svg>
    );
}
