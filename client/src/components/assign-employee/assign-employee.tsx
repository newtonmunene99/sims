import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "assign-employee",
  styleUrl: "assign-employee.scss",
  shadow: true
})
export class AssignEmployee {
  assignEmployeeModal: HTMLIonModalElement;
  dataProvider: DataProvider = new DataProvider();
  @State() users = [];
  @State() shopId: string;

  componentDidLoad() {
    this.assignEmployeeModal = document.querySelector("ion-modal");
    this.shopId = this.assignEmployeeModal.componentProps.shopId;
    this.getUsers();
  }

  getUsers() {
    this.dataProvider
      .getUsers()
      .then((results: any) => {
        const formattedUsers = [];
        this.dataProvider
          .getShopEmployees(this.shopId)
          .then((res: any) => {
            for (const user of results.users) {
              if (res.employees.find(employee => employee.userId == user.id)) {
                formattedUsers.push({
                  ...user,
                  alreadyAdded: true
                });
              } else {
                formattedUsers.push({
                  ...user,
                  alreadyAdded: false
                });
              }
            }
            console.log(formattedUsers);
            this.users = formattedUsers;
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAssignment(id: string) {
    this.dataProvider
      .assignUserShop(id, this.shopId)
      .then(() => {
        this.presentToast("Employee assigned successfully");
        this.getUsers();
      })
      .catch(error => {
        this.presentToast(
          "There was a problem assigning this employee. Please try again"
        );
        console.error(error);
      });
  }

  handleUnassignment(id: string) {
    this.dataProvider
      .deleteUserFromShop(id, this.shopId)
      .then(() => {
        this.presentToast("Employee unassigned successfully");
        this.getUsers();
      })
      .catch(error => {
        this.presentToast(
          "There was a problem assigning this employee. Please try again"
        );
        console.error(error);
      });
  }

  async presentToast(message: string) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }

  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Assign new employee</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.assignEmployeeModal.dismiss();
              }}
            >
              Cancel
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list inset lines="inset">
          <ion-list-header>
            <ion-label>
              Here's a list of users. Click on the add icon to assign a new
              employee and the delete icon to unassign an employee
            </ion-label>
          </ion-list-header>

          {this.users.map(user => {
            return (
              <ion-item>
                <ion-label>{`${user.firstName} ${user.lastName}`}</ion-label>

                <ion-buttons slot="end">
                  {user.alreadyAdded ? (
                    <ion-button
                      size="small"
                      shape="round"
                      fill="clear"
                      onClick={() => {
                        this.handleUnassignment(user.id);
                      }}
                    >
                      <ion-icon
                        slot="icon-only"
                        color="danger"
                        name="trash-outline"
                      ></ion-icon>
                    </ion-button>
                  ) : (
                    <ion-button
                      size="small"
                      shape="round"
                      fill="clear"
                      onClick={() => {
                        this.handleAssignment(user.id);
                      }}
                    >
                      <ion-icon
                        slot="icon-only"
                        color="primary"
                        name="add-circle-outline"
                      ></ion-icon>
                    </ion-button>
                  )}
                </ion-buttons>
              </ion-item>
            );
          })}
        </ion-list>
      </ion-content>
    ];
  }
}
