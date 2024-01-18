import { SVGProps, VFC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface Props {
 className?: string;
 Svg: VFC<SVGProps<SVGSVGElement>>;
 inverted?: boolean;
}

export function Icon({ className, Svg, inverted }: Props) {
    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}> </Svg>
    );
}
