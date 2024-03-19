import React, {
    InputHTMLAttributes,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readonly'
>;

interface InputProps extends HTMLInputProps {
    onChange?: (value: string) => void;
    autofocus?: boolean;
    className?: string;
    readonly?: boolean;
    value?: string | number;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
    const {
        readonly = false,
        type = 'text',
        placeholder,
        autofocus,
        className,
        onChange,
        value,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };
    const mods: Mods = {
        [cls.readonly]: readonly,
    };
    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>{`${placeholder}: `}</div>
            )}
            <div className={cls.inputBox}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    readOnly={readonly}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...otherProps}
                />
            </div>
        </div>
    );
});
