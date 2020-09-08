import { FunctionalComponent, h } from "@stencil/core";

interface RouteProps {
  url: string;
  component: string;
  redirectUrl?: string;
}

const auth = {
  isAuthenticated: () => {
    if (localStorage.getItem("sims-token")) {
      return true;
    } else {
      return false;
    }
  }
};

export const StartRoute: FunctionalComponent<RouteProps> = (
  { url, component, redirectUrl },
  children
) => {
  if (auth.isAuthenticated()) {
    return (
      <ion-route url={url} component={component}>
        {children}
      </ion-route>
    );
  } else {
    return (
      <ion-route-redirect
        from={url}
        to={redirectUrl ? redirectUrl : "/login"}
      />
    );
  }
};
