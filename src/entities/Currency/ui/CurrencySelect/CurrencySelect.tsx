import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
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
            <ListBox
                label={t('Укажите валюту')}
                defaultValue={t('Укажите валюту')}
                className={className}
                readonly={readonly}
                items={options}
                value={value}
                onChange={onChangeHandler}
            />
        );
    },
);
