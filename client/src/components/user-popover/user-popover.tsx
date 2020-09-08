import { Component, h, State } from "@stencil/core";

@Component({
  tag: "user-popover",
  styleUrl: "user-popover.scss"
})
export class UserPopover {
  @State() user;
  userPopover: HTMLIonPopoverElement;

  componentDidLoad() {
    this.userPopover = document.querySelector("ion-popover");
    this.user = this.userPopover.componentProps.user;
  }
  render() {
    return (
      <ion-list lines="none" inset>
        {this.user && this.user.role == 1
          ? [
              <ion-button
                fill="clear"
                expand="full"
                onClick={() => {
                  this.userPopover.dismiss("go-to-admin");
                }}
              >
                Go to Admin
              </ion-button>,
              <ion-button
                fill="clear"
                expand="full"
                onClick={() => {
                  this.userPopover.dismiss("go-to-employee");
                }}
              >
                Go to Employee
              </ion-button>
            ]
          : null}
        <ion-button
          fill="clear"
          expand="full"
          onClick={() => {
            this.userPopover.dismiss("change-password");
          }}
        >
          Change Password
        </ion-button>
      </ion-list>
    );
  }
}
