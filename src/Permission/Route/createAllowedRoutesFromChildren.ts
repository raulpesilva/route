import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { RuleMaker } from '..';
import { AllowRoute } from './AllowRoute';

export const createAllowedRoutesFromChildren = (children: React.ReactNode, rules: Record<string, boolean>) => {
  const routes: React.JSX.Element[] = [];
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;
    // iterar sobre todos os filhos ( fragment/ authorized route/ route ) para garantir que nao ficou nenhum authorized route sem route
    // routes aninhadas nao ta funcionando
    // talvez adicionar a possibilidade de ter um fallback
    // console.log(children);
    const elementChildren = element.props.children;
    const isAuthorizedRoute = element.type === AllowRoute;
    const isAuthorized =
      isAuthorizedRoute && element.props.when?.some((r: RuleMaker<Record<string, boolean>>) => r.execute(rules));
    const isRoute = element.type === Route;
    const isRouteWithChildren = isRoute && elementChildren;

    if (element.type === Fragment) return routes.push(...createAllowedRoutesFromChildren(elementChildren, rules));
    if (isAuthorized) return routes.push(...createAllowedRoutesFromChildren(elementChildren, rules));
    if (isAuthorizedRoute && element.props.when !== undefined) return;
    if (isAuthorizedRoute) return routes.push(...createAllowedRoutesFromChildren(elementChildren, rules));
    if (isRouteWithChildren && element.props.index) {
      element.props.children = createAllowedRoutesFromChildren(elementChildren, rules);
      return routes.push(element);
    }
    // if (isRouteWithChildren) return routes.push(...createAuthorizedRoutesFromChildren(elementChildren, rules));
    // arrumar pq quebrou as outras
    // if (isRouteWithChildren && element.props.index === undefined)
    //   return routes.push(...createAuthorizedRoutesFromChildren(elementChildren, rules));
    // console.log(element);
    if (isRoute) return routes.push(element);
    throw new Error(
      `[${
        typeof element.type === 'string' ? element.type : element.type.name
      }] is not a <Route> or <AllowRoute> component. All component children of <AllowedRoutes> must be a <Route>,<AllowRoute> or <React.Fragment>`
    );
  });
  return routes;
};
