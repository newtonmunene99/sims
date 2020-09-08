import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "admin-employees",
  styleUrl: "admin-employees.scss"
})
export class AdminEmployees {
  @State() employees: Array<any> = [];

  addEmployeeModal: HTMLIonModalElement;
  editEmployeeModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentWillLoad() {
    this.getEmployees();
  }

  getEmployees() {
    this.employees = [];
    this.dataProvider
      .getUsers()
      .then((results: any) => {
        this.employees = results.users;
      })
      .catch(error => {
        console.error(error);
      });
  }
  async showAddEmployeeModal() {
    this.addEmployeeModal = document.createElement("ion-modal");

    this.addEmployeeModal.component = "add-employee";
    this.addEmployeeModal.backdropDismiss = false;

    document.body.appendChild(this.addEmployeeModal);

    this.addEmployeeModal.present();

    const { data } = await this.addEmployeeModal.onDidDismiss();
    console.log(data);
  }

  async showEditEmployeeModal(employee) {
    this.editEmployeeModal = document.createElement("ion-modal");

    this.editEmployeeModal.component = "edit-employee";
    this.editEmployeeModal.componentProps = { employee };
    this.editEmployeeModal.backdropDismiss = false;

    document.body.appendChild(this.editEmployeeModal);

    this.editEmployeeModal.present();

    const { data } = await this.editEmployeeModal.onDidDismiss();
    if (data) {
      this.getEmployees();
    }
  }
  render() {
    return (
      <ion-content>
        <ion-button
          expand="block"
          size="large"
          onClick={() => {
            this.showAddEmployeeModal();
          }}
        >
          Add Employee
        </ion-button>
        <div id="employees-table">
          <ion-grid>
            <ion-row class="table-header">
              <ion-col>Name</ion-col>
              <ion-col>Email</ion-col>
              <ion-col size="2">Role</ion-col>
              <ion-col size="1">Active</ion-col>
              <ion-col size="1"></ion-col>
            </ion-row>
            {this.employees.map(employee => (
              <ion-row>
                <ion-col>{`${employee.firstName} ${employee.lastName}`}</ion-col>
                <ion-col>{employee.email}</ion-col>
                <ion-col size="2">
                  {employee.role == 1 ? "Admin" : "Employee"}
                </ion-col>
                <ion-col size="1">
                  {employee.active == 1 ? "Yes" : "No"}
                </ion-col>
                <ion-col size="1">
                  <ion-button
                    size="small"
                    shape="round"
                    fill="clear"
                    onClick={() => {
                      this.showEditEmployeeModal(employee);
                    }}
                  >
                    <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            ))}
          </ion-grid>
        </div>
      </ion-content>
    );
  }
}
