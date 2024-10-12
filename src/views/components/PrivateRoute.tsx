import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuthStore((state) => state.isAuth);

  return auth ? children : <Navigate to="/signin" />;
}

export { PrivateRoute };
