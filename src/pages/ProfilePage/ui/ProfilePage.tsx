import { profileReducer } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

interface Props {
 className?: string;
}
const reducers: ReducersList = {
    profile: profileReducer,
};
export default function ProfilePage({ className }: Props) {
    const { t } = useTranslation();
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

            <div className={classNames('', {}, [className])}>
                {t('страница профиля')}
            </div>
        </DynamicModuleLoader>
    );
}
