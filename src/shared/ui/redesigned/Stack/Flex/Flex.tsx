import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'around' | 'between';
export type FlexAlign =
    | 'start'
    | 'center'
    | 'end'
    | 'around'
    | 'between'
    | 'stretch';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexGap = '4' | '8' | '16' | '24' | '32' | '64';

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;
export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexGap;
    max?: boolean;
}
const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    around: cls.justifyAround,
    between: cls.justifyBetween,
};
const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
    around: cls.alignAround,
    between: cls.alignBetween,
    stretch: cls.alignStretch,
};
const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
    'row-reverse': cls.directionRowReverse,
    'column-reverse': cls.justifyColumnReverse,
};
const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
    64: cls.gap64,
};

export const Flex = ({
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
    ...otherProps
}: FlexProps) => {
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap ? gapClasses[gap] : undefined,
    ];
    const mods: Mods = {
        [cls.max]: max,
    };
    return (
        <div
            className={classNames(cls.Flex, mods, classes)}
            {...otherProps}
        >
            {children}
        </div>
    );
};
