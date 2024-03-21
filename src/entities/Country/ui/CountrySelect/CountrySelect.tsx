import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';

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
    ({ className, value, onChange, readonly }: Props) => {
        const { t } = useTranslation();
        const onChangeHandler = (value: string) => {
            if (onChange) {
                onChange(value as Country);
            }
        };
        const props = {
            className,
            value,
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: 'top right' as const,
        };

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        );
    },
);
