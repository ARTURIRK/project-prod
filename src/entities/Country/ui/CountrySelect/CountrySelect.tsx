import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popups/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface Props {
 className?: string;
 value?: Country;
 onChange?: (value: Country) => void;
 readonly?: boolean;
}
const options = [
    { value: Country.RUS, content: Country.RUS },
    { value: Country.KZH, content: Country.KZH },
    { value: Country.BEL, content: Country.BEL },
];
export const CountrySelect = memo(
    ({
        className, value, onChange, readonly,
    }: Props) => {
        const { t } = useTranslation();
        const onChangeHandler = (value: string) => {
            if (onChange) {
                onChange(value as Country);
            }
        };
        return (
            <ListBox
                className={className}
                label={t('Укажите страну')}
                defaultValue={t('Укажите страну')}
                readonly={readonly}
                items={options}
                value={value}
                onChange={onChangeHandler}
            />
        );
    },
);
