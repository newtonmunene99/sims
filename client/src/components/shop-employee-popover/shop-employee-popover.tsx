import { Component, h } from "@stencil/core";

@Component({
  tag: "shop-employee-popover",
  styleUrl: "shop-employee-popover.scss",
  shadow: true
})
export class ShopEmployeePopover {
  shopEmployeePopover: HTMLIonPopoverElement;

  componentDidLoad() {
    this.shopEmployeePopover = document.querySelector("ion-popover");
  }
  render() {
    return (
      <ion-list lines="inset">
        <ion-item
          onClick={() => {
            this.shopEmployeePopover.dismiss("assign");
          }}
        >
          <ion-label>Assign Employee</ion-label>
        </ion-item>
        <ion-item
          onClick={() => {
            this.shopEmployeePopover.dismiss("edit");
          }}
        >
          <ion-label>View/Edit Employee</ion-label>
        </ion-item>
      </ion-list>
    );
  }
}
