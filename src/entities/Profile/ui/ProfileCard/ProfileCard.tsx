import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileInfo } from 'entities/Profile/models/selectors/getProfileInfo/getProfileInfo';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface Props {
 className?: string;
}

export function ProfileCard({ className }: Props) {
    const { t } = useTranslation();
    const profileInfo = useSelector(getProfileInfo);
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input className={cls.input} value={profileInfo?.data?.firstName} placeholder={t('Ваше имя')} />
                <Input className={cls.input} value={profileInfo?.data?.lastName} placeholder={t('Ваше фамилия')} />
            </div>
        </div>
    );
}
