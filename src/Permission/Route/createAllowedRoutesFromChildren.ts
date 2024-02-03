import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { isAllowed } from '../utils';
import { AllowRoute } from './AllowRoute';

export const createAllowedRoutesFromChildren = (children: React.ReactNode, rules: Record<string, boolean>) => {
  const routes: React.JSX.Element[] = [];
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;

    const children = element.props.children;

    const isFragment = element.type === Fragment;
    if (isFragment && children) return routes.push(...createAllowedRoutesFromChildren(children, rules));
    if (isFragment && !children) return;

    const isRoute = element.type === Route;
    if (isRoute && !children) return routes.push(element);
    if (isRoute && children) {
      const result = createAllowedRoutesFromChildren(children, rules);
      return routes.push({ ...element, props: { ...element.props, children: result } });
    }

    const isAllowRoute = element.type === AllowRoute;
    const keep = isAllowRoute && (element.props.when === undefined || isAllowed(element.props.when, rules));
    if (isAllowRoute && keep && children) return routes.push(...createAllowedRoutesFromChildren(children, rules));
    if (isAllowRoute && keep && !children) return;
    if (isAllowRoute && !keep) return;

    const name = typeof element.type === 'string' ? element.type : element.type.name;
    throw new Error(
      `[${name}] is not a <Route> or <AllowRoute> component. All component children of <AllowedRoutes> must be a <Route>,<AllowRoute> or <React.Fragment>`
    );
  });
  return routes;
};
