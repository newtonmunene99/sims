import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "edit-employee",
  styleUrl: "edit-employee.scss",
  shadow: true,
})
export class EditEmployee {
  @State() firstName: string;
  @State() lastName: string;

  @State() role: number;
  @State() active: number;

  @State() employee: any;

  editEmployeeModal: HTMLIonModalElement;
  dataProvider: DataProvider = new DataProvider();

  componentDidLoad() {
    this.editEmployeeModal = document.querySelector("ion-modal");

    this.employee = this.editEmployeeModal.componentProps.employee;

    this.firstName = this.employee.firstName;
    this.lastName = this.employee.lastName;

    this.role = this.employee.role;
    this.active = this.employee.active;
  }

  handleEdit() {
    this.dataProvider
      .updateUser(
        this.firstName,
        this.lastName,
        this.role,
        this.active,
        this.employee.id
      )
      .then((results) => {
        this.editEmployeeModal.dismiss(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Edit employee</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.editEmployeeModal.dismiss();
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

            <ion-radio-group
              value={this.role}
              onIonChange={(ev: any) => {
                this.role = ev.target.value;
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

            <ion-radio-group
              value={this.active}
              onIonChange={(ev: any) => {
                this.active = ev.target.value;
              }}
            >
              <ion-list-header>
                <ion-label>Employee Active</ion-label>
              </ion-list-header>

              <ion-item>
                <ion-label>Yes</ion-label>
                <ion-radio slot="start" value={1}></ion-radio>
              </ion-item>

              <ion-item>
                <ion-label>No</ion-label>
                <ion-radio slot="start" value={2}></ion-radio>
              </ion-item>
            </ion-radio-group>

            <ion-button
              fill="solid"
              expand="block"
              size="large"
              onClick={() => {
                this.handleEdit();
              }}
              disabled={
                !this.firstName || !this.lastName || !this.active || !this.role
              }
            >
              Save Changes
            </ion-button>
          </ion-list>
        </div>
      </ion-content>,
    ];
  }
}
