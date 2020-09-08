import { Component, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {
  private router: HTMLIonRouterElement;

  componentDidLoad() {
    this.router = document.querySelector("ion-router");
    const user = JSON.parse(localStorage.getItem("sims-user"));
    if (user.role == 1) {
      this.router.push("/admin");
    } else if (user.role == 2) {
      this.router.push("/dashboard");
    }
  }

  render() {
    return (
      <ion-content>
        <div class="header"></div>
        <div class="header-overlay">
          <div class="header-text">
            <h1>SIMS</h1>
            <h3>Shop Inventory Management System</h3>

            <ion-button size="large" fill="default" href="/login">
              Get started
              <ion-icon slot="end" name="arrow-forward-outline"></ion-icon>
            </ion-button>
          </div>
        </div>
      </ion-content>
    );
  }
}
