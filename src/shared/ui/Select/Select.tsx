import { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}
interface Props {
 className?: string;
 label: string;
 options?: SelectOption[];
 readonly?: boolean;
 value?: string;
 onChange?: (value: string) => void;
}

export const Select = memo(({
    className, label, options, value, onChange, readonly,
}: Props) => {
    const mods: Mods = {

    };
    const optionList = useMemo(() => options?.map((el) => (
        <option className={cls.option} key={el.value}>
            {el.content}
        </option>
    )), [options]);
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
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
});
