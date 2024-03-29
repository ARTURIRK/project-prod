import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { getUserAuthData } from '@/entities/User';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileInfo } from '../../model/selectors/getProfileInfo';
import { updateProfileData } from '../../model/servives/updateProfileData/updateProfileData';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation();
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileInfo);
        const dispatch = useAppDispatch();
        const canEdit = authData?.id === profileData?.data?.id;
        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        padding="24"
                        max
                        border="partial"
                    >
                        <HStack
                            max
                            justify="between"
                            className={classNames('', {}, [className])}
                        >
                            <Text title={t('Профиль')} />
                            {canEdit && (
                                <div>
                                    {profileData?.readonly ? (
                                        <Button
                                            onClick={onEdit}
                                            data-testid="EditableProfileCardHeader.Edit"
                                        >
                                            {t('Редактировать')}
                                        </Button>
                                    ) : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                data-testid="EditableProfileCardHeader.Cancel"
                                                color="error"
                                            >
                                                {t('Отменить')}
                                            </Button>
                                            <Button
                                                onClick={onSave}
                                                data-testid="EditableProfileCardHeader.Save"
                                                color="success"
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        </HStack>
                                    )}
                                </div>
                            )}
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        max
                        justify="between"
                        className={classNames('', {}, [className])}
                    >
                        <TextDeprecated title={t('Профиль')} />
                        {canEdit && (
                            <div>
                                {profileData?.readonly ? (
                                    <ButtonDeprecated
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.Edit"
                                    >
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                ) : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.Cancel"
                                        >
                                            {t('Отменить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={onSave}
                                            data-testid="EditableProfileCardHeader.Save"
                                        >
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                }
            />
        );
    },
);
