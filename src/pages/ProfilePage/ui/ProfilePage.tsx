import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { EditableProfileCard } from 'features/EditableProfileContent';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';

interface Props {
 className?: string;
}

export default function ProfilePage({ className }: Props) {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation();
    if (!id) {
        return <Text text={t('Профиль не найден')} />;
    }
    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" align="stretch" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
}
