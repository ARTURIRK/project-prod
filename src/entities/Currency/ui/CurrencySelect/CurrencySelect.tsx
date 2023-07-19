import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';

interface Props {
 className?: string;
 value?: Currency;
 onChange?: (value: Currency) => void;
 readonly?: boolean;
}
const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
];
export const CurrencySelect = memo(
    ({
        className, value, onChange, readonly,
    }: Props) => {
        const { t } = useTranslation();
        const onChangeHandler = (value: string) => {
            if (onChange) {
                onChange(value as Currency);
            }
        };
        return (
            <Select
                label={t('Укажите валюту')}
                readonly={readonly}
                options={options}
                value={value}
                onChange={onChangeHandler}
            />
        );
    },
);
