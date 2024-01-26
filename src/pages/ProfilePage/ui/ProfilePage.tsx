import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileContent';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';

interface Props {
 className?: string;
}

export default function ProfilePage({ className }: Props) {
    const { id } = useParams<{id: string}>();
    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16" align="stretch" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
}
