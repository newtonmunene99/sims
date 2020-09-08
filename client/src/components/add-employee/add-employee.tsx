import { Component, h, State } from "@stencil/core";
import { AuthProvider } from "../../services/auth";

@Component({
  tag: "add-employee",
  styleUrl: "add-employee.scss",
  shadow: true
})
export class AddEmployee {
  @State() firstName: string;
  @State() lastName: string;
  @State() email: string;
  @State() role: number;

  addEmployeeModal: HTMLIonModalElement;
  authProvider: AuthProvider = new AuthProvider();

  componentDidLoad() {
    this.addEmployeeModal = document.querySelector("ion-modal");
  }

  handleRegister() {
    this.authProvider
      .register(this.email, this.firstName, this.lastName, this.role)
      .then(results => {
        this.addEmployeeModal.dismiss(results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Add new employee</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.addEmployeeModal.dismiss();
              }}
            >
              Cancel
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <div class="form-wrapper">
          <ion-list>
            <ion-list-header>
              <ion-label>Employee details</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label position="stacked">First Name</ion-label>
              <ion-input
                type="text"
                name="fname"
                required
                placeholder="Enter employee first name"
                value={this.firstName}
                onInput={(event: any) => {
                  this.firstName = event.target.value;
                }}
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Last Name</ion-label>
              <ion-input
                type="text"
                name="lname"
                required
                placeholder="Enter employee last name"
                value={this.lastName}
                onInput={(event: any) => {
                  this.lastName = event.target.value;
                }}
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                type="email"
                name="email"
                required
                placeholder="Enter Employee Email"
                value={this.email}
                onInput={(ev: any) => {
                  this.email = ev.target.value;
                }}
              ></ion-input>
            </ion-item>

            <ion-radio-group
              value={2}
              onIonChange={(ev: any) => {
                this.role = ev.target.value;
                console.log(ev.target.value);
              }}
            >
              <ion-list-header>
                <ion-label>Employee role</ion-label>
              </ion-list-header>

              <ion-item>
                <ion-label>Admin</ion-label>
                <ion-radio slot="start" value={1}></ion-radio>
              </ion-item>

              <ion-item>
                <ion-label>Employee</ion-label>
                <ion-radio slot="start" value={2}></ion-radio>
              </ion-item>
            </ion-radio-group>

            <ion-button
              fill="solid"
              expand="block"
              size="large"
              onClick={() => {
                this.handleRegister();
              }}
              disabled={
                !this.firstName || !this.lastName || !this.email || !this.role
              }
            >
              Add Employee
            </ion-button>
          </ion-list>
        </div>
      </ion-content>
    ];
  }
}
