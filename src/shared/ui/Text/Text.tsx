import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum AlignText {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}
type HeaderTagType = 'h1' | 'h2' | 'h3';
const maapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};
interface TextProps {
    className?: string;
    size?: TextSize;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: AlignText;
}

export const Text = memo((props: TextProps) => {
    const {
        theme = TextTheme.PRIMARY,
        align = AlignText.LEFT,
        size = TextSize.M,
        className,
        title,
        text,
    } = props;
    const HeaderTag = maapSizeToHeaderTag[size];
    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    };
    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
