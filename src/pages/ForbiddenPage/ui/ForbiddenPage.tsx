import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

interface Props {
 className?: string;
}

export default function ForbiddenPage({ className }: Props) {
    const { t } = useTranslation();
    return (
        <Page>
            {t('Доступ запрещен')}
        </Page>
    );
}
