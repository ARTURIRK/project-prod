import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { ListBox } from '@/shared/ui/redesigned/Popups';

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
    ({ className, value, onChange, readonly }: Props) => {
        const { t } = useTranslation();
        const onChangeHandler = (value: string) => {
            if (onChange) {
                onChange(value as Currency);
            }
        };
        const props = {
            className,
            value,
            defaultValue: t('Укажите валюту'),
            label: t('Укажите валюту'),
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: 'top right' as const,
        };

        return <ListBox {...props} />;
    },
);

export { Currency };
