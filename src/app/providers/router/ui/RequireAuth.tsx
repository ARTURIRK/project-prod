import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface Props {
  children: JSX.Element;
}

export function RequireAuth({ children }: Props) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    if (auth) {
        return children;
    }
    return (
        <Navigate to={RoutePath.main} state={{ from: location }} replace />
    );
}