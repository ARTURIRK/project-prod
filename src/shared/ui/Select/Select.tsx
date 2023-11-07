import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}
interface Props<T extends string> {
 className?: string;
 label: string;
 options?: SelectOption<T>[];
 readonly?: boolean;
 value?: T;
 onChange?: (value: T) => void;
}

export const Select = <T extends string> ({
    className, label, options, value, onChange, readonly,
}: Props<T>) => {
    const mods: Mods = {

    };
    const optionList = useMemo(() => options?.map((el) => (
        <option className={cls.option} key={el.value}>
            {el.content}
        </option>
    )), [options]);
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };
    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {
                label && (
                    <span className={cls.label}>
                        {label}
                    </span>
                )
            }
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {optionList}
            </select>
        </div>
    );
};
