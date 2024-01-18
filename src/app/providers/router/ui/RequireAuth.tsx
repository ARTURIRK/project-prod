import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole, getUserAuthData, getRolesSelector } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

interface Props {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: Props) {
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getRolesSelector);
    const location = useLocation();
    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((reqRole) => {
            const hasRole = userRoles?.includes(reqRole);
            return hasRole;
        });
    }, [roles, userRoles]);
    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }
    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }
    return children;
}
