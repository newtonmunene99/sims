import { Component, h, State } from "@stencil/core";
import { AuthProvider } from "../../services/auth";

@Component({
  tag: "admin-login",
  styleUrl: "admin-login.scss",
})
export class AdminLogin {
  @State() email: string;
  @State() password: string;
  private authProvider: AuthProvider = new AuthProvider();

  handleLogin() {
    this.authProvider
      .login(this.email, this.password)
      .then((results) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ion-content color="primary">
        <div class="login-wrapper">
          <div class="left">
            <ion-card>
              <ion-list inset lines="none">
                <h1>Login</h1>
                <ion-item>
                  <ion-label position="floating">Enter email</ion-label>
                  <ion-input
                    type="email"
                    name="email"
                    value={this.email}
                    onInput={(ev: any) => {
                      this.email = ev.target.value;
                    }}
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="floating">Enter Password</ion-label>
                  <ion-input
                    type="password"
                    name="password"
                    value={this.password}
                    onInput={(ev: any) => {
                      this.password = ev.target.value;
                    }}
                  ></ion-input>
                </ion-item>

                <ion-button
                  fill="solid"
                  expand="block"
                  disabled={!this.email || !this.password}
                >
                  Login
                </ion-button>
              </ion-list>
            </ion-card>
          </div>
          <div class="right">
            <h3>SIMS</h3>
            <ul>
              <li>Easy to use</li>
              <li>Manage employees</li>
              <li>Manage products</li>
            </ul>
          </div>
        </div>
      </ion-content>
    );
  }
}
