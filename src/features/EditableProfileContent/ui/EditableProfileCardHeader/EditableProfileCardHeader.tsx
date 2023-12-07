import { getUserAuthData } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileInfo } from '../../model/selectors/getProfileInfo';
import { updateProfileData } from '../../model/servives/updateProfileData/updateProfileData';

interface Props {
 className?: string;
}

export function EditableProfileCardHeader({ className }: Props) {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileInfo);
    const dispatch = useAppDispatch();
    const onEdit = () => dispatch(profileActions.setReadonly(false));
    const onSave = () => dispatch(updateProfileData());
    const onCancel = () => dispatch(profileActions.cancelEdit());
    return (
        <HStack justify="between" max className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {
                authData?.id === profileData?.data?.id && (
                    profileData?.readonly ? (
                        <Button theme={ButtonTheme.OUTLINE} onClick={onEdit} data-testid="EditableProfileCardHeader.Edit">
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                                data-testid="EditableProfileCardHeader.Save"
                            >
                                {t('Сохранить')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancel}
                                data-testid="EditableProfileCardHeader.Cancel"
                            >
                                {t('Отменить')}
                            </Button>
                        </HStack>
                    )
                )
            }
        </HStack>
    );
}
