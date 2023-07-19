import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum AlignText {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: AlignText;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        align = AlignText.LEFT,
        theme = TextTheme.PRIMARY,
    } = props;
    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
    };
    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
