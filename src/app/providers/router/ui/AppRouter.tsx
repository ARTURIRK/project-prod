import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader';
import { AppRouteProps } from '@/shared/types';
import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = (route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    };

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
