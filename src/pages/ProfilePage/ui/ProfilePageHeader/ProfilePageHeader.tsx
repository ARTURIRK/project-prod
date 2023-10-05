import { getProfileInfo, profileActions, updateProfileData } from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';

interface Props {
 className?: string;
 readonly?: boolean;
}

export function ProfilePageHeader({ className, readonly }: Props) {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileInfo);
    const dispatch = useAppDispatch();
    const onEdit = () => dispatch(profileActions.setReadonly(false));
    const onSave = () => dispatch(updateProfileData());
    const onCancel = () => dispatch(profileActions.cancelEdit());
    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {
                authData?.id === profileData?.data?.id ? (
                    <div className={cls.btnWrapper}>
                        {
                            readonly ? (
                                <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn} onClick={onEdit}>
                                    {t('Редактировать')}
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        theme={ButtonTheme.OUTLINE}
                                        className={cls.saveBtn}
                                        onClick={onSave}
                                    >
                                        {t('Сохранить')}
                                    </Button>
                                    <Button
                                        theme={ButtonTheme.OUTLINE_RED}
                                        className={cls.cancelBtn}
                                        onClick={onCancel}
                                    >
                                        {t('Отменить')}
                                    </Button>
                                </>
                            )
                        }
                    </div>
                ) : null
            }

        </div>
    );
}
