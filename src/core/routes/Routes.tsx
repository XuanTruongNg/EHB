import * as React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { ROUTES, SingleRoute } from "./routesConfig";

const Routes: React.FunctionComponent = () => {
  const _renderRoute = (routes: SingleRoute[]) =>
    routes.map((route) => {
      const { path, component, children } = route;
      return (
        <Route key={path} element={route.guard}>
          <Route path={path} element={component}>
            {children ? _renderRoute(children) : null}
          </Route>
        </Route>
      );
    });
  return <ReactRoutes>{_renderRoute(ROUTES)}</ReactRoutes>;
};

export default Routes;
