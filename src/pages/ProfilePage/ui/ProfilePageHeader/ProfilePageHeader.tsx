import { profileActions, updateProfileData } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
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
    const dispatch = useAppDispatch();
    const onEdit = () => dispatch(profileActions.setReadonly(false));
    const onSave = () => dispatch(updateProfileData());
    const onCancel = () => dispatch(profileActions.cancelEdit());
    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
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
    );
}
