import { RouteProps } from 'react-router-dom';
import { Rule } from '..';

type AllowRouteProps = RouteProps & {
  children: React.ReactNode;
  when?: Rule[];
};

export const AllowRoute = ({ children }: AllowRouteProps) => children;
