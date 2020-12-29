import { Component, h, State } from "@stencil/core";
import { AuthProvider } from "../../services/auth";

@Component({
  tag: "sims-login",
  styleUrl: "sims-login.scss",
  shadow: true,
})
export class SimsLogin {
  @State() email: string;
  @State() password: string;

  private authProvider: AuthProvider = new AuthProvider();
  private router: HTMLIonRouterElement;

  componentDidLoad() {
    this.router = document.querySelector("ion-router");
  }

  handleLogin() {
    this.authProvider
      .login(this.email, this.password)
      .then((results: any) => {
        if (results.user.role == 1) {
          this.router.push("/admin");
        } else if (results.user.role == 2) {
          this.router.push("/dashboard");
        }
      })
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
                  onClick={() => this.handleLogin()}
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
