import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
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
interface Props {
    className?: string;
    size?: TextSize;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: AlignText;
    'data-testid'?: string;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Text = memo((props: Props) => {
    const {
        theme = TextTheme.PRIMARY,
        align = AlignText.LEFT,
        'data-testid': dataTestId = 'Text',
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
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    className={cls.text}
                    data-testid={`${dataTestId}.Paragraph`}
                >
                    {text}
                </p>
            )}
        </div>
    );
});
