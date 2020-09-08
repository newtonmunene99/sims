import { Component, h } from "@stencil/core";
import { ProtectedRoute as AdminProtectedRoute } from "../ProtectedRoutes/AdminProtectedRoute";
import { ProtectedRoute as EmployeeProtectedRoute } from "../ProtectedRoutes/EmployeeProtectedRoute";
import "stencil-apexcharts";
@Component({
  tag: "app-root",
  styleUrl: "app-root.scss"
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router id="root-router" useHash={false}>
          <ion-route-redirect from="/" to="/index" />

          <ion-route url="/index" component="app-home" />

          <EmployeeProtectedRoute url="/dashboard" component="sims-dashboard">
            <ion-route url="/" component="sims-shops" />
            <ion-route url="/shops/:id" component="sims-shop" />
          </EmployeeProtectedRoute>

          <AdminProtectedRoute url="/admin" component="admin-dashboard">
            <ion-route url="/" component="admin-general" />
            <ion-route url="/products" component="admin-products" />
            <ion-route url="/shops" component="admin-shops" />
            <ion-route url="/employees" component="admin-employees" />
          </AdminProtectedRoute>

          <ion-route url="/login" component="sims-login" />
          <ion-route url="/password/change" component="change-password" />
        </ion-router>
        <ion-nav id="root-nav" />
      </ion-app>
    );
  }
}
