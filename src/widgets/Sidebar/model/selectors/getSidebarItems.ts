import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/shared/const';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    let sidebarItemList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            text: 'Главная',
            Icon: MainIcon,
        },
        {
            path: RoutePath.about,
            text: 'О сайте',
            Icon: AboutIcon,
        },
    ];
    if (userData) {
        sidebarItemList = [...sidebarItemList, {
            path: RoutePath.profile + userData.id,
            text: 'Профиль',
            Icon: ProfileIcon,
            authOnly: true,
        },
        {
            path: RoutePath.articles,
            text: 'Статьи',
            Icon: ArticleIcon,
            authOnly: true,
        }];
    }
    return sidebarItemList;
});
