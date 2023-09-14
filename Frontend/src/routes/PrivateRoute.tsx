import React, { ElementType, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN } from './routes';

import { useAppSelector } from "../store/hooks";

interface IProps {
  layout: ElementType;
  children: PropsWithChildren;
}

const PrivateRoute: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { children, layout: Layout } = props;
  const { pathname } = useLocation();
  
  const { isLoggedIn } = useAppSelector((state: any) => state.auth);

  return isLoggedIn ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate
      to={{
        pathname: LOGIN,
        search:
          pathname && pathname !== '/' ? `?redirect=${pathname}` : undefined,
      }}
    />
  );
};

export { PrivateRoute };
