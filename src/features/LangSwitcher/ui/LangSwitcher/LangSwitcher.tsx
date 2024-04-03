import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';

interface Props {
    short?: boolean;
}

export const LangSwitcher = memo(({ short }: Props) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            variant="clear"
            onClick={toggle}
        >
            {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
    );
});
