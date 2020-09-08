import { FunctionalComponent, h } from "@stencil/core";

interface RouteProps {
  url: string;
  component: string;
  redirectUrl?: string;
}

const auth = {
  isAuthenticated: (): boolean => {
    if (localStorage.getItem("sims-token")) {
      return true;
    } else {
      return false;
    }
  },
  role: (): number => {
    const user = JSON.parse(localStorage.getItem("sims-user"));
    return user.role;
  }
};

export const ProtectedRoute: FunctionalComponent<RouteProps> = (
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
