import { Routes } from 'react-router-dom';
import { RulesProvider } from '..';
import { createAllowedRoutesFromChildren } from './createAllowedRoutesFromChildren';

const useRoutesWithRules = (routes: React.ReactNode) => routes;

interface AllowedRoutesProps {
  children: React.ReactNode;
  rules: Record<string, boolean>;
}
export const AllowedRoutes = ({ children, rules }: AllowedRoutesProps) => {
  const routes = useRoutesWithRules(createAllowedRoutesFromChildren(children, rules));
  return (
    <RulesProvider rules={rules}>
      <Routes>{routes}</Routes>
    </RulesProvider>
  );
};
