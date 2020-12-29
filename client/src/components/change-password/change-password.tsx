import { Component, h, State } from "@stencil/core";
import { AuthProvider } from "../../services/auth";

@Component({
  tag: "change-password",
  styleUrl: "change-password.scss",
  shadow: true,
})
export class ChangePassword {
  @State() oldPassword: string;
  @State() newPassword: string;

  private authProvider: AuthProvider = new AuthProvider();
  private router: HTMLIonRouterElement;

  componentDidLoad() {
    this.router = document.querySelector("ion-router");
  }

  handleUpdate() {
    this.authProvider
      .updatePassword(this.oldPassword, this.newPassword)
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
                <h1>Update Password</h1>
                <ion-item>
                  <ion-label position="floating">Enter Old Password</ion-label>
                  <ion-input
                    type="password"
                    name="oldPasssword"
                    value={this.oldPassword}
                    onInput={(ev: any) => {
                      this.oldPassword = ev.target.value;
                    }}
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="floating">Enter New Password</ion-label>
                  <ion-input
                    type="password"
                    name="newPassword"
                    value={this.newPassword}
                    onInput={(ev: any) => {
                      this.newPassword = ev.target.value;
                    }}
                  ></ion-input>
                </ion-item>

                <ion-button
                  fill="solid"
                  expand="block"
                  disabled={!this.oldPassword || !this.newPassword}
                  onClick={() => this.handleUpdate()}
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
