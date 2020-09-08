import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "edit-shop",
  styleUrl: "edit-shop.scss",
  shadow: true
})
export class EditShop {
  @State() name: string;
  @State() location: string;
  @State() shop: any;

  editShopModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentDidLoad() {
    this.editShopModal = document.querySelector("ion-modal");
    this.shop = this.editShopModal.componentProps.shop;

    this.name = this.shop.name;
    this.location = this.shop.location;
  }

  handleEditShop() {
    this.dataProvider
      .editShop(this.name, this.location, this.shop.id)
      .then(results => {
        this.editShopModal.dismiss(results);
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Edit shop</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.editShopModal.dismiss();
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
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input
                type="text"
                name="name"
                required
                placeholder="Enter name of the shop"
                value={this.name}
                onInput={(event: any) => {
                  this.name = event.target.value;
                }}
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Location</ion-label>
              <ion-input
                type="text"
                name="location"
                required
                placeholder="Where is the shop situated?"
                value={this.location}
                onInput={(event: any) => {
                  this.location = event.target.value;
                }}
              ></ion-input>
            </ion-item>

            <ion-button
              fill="solid"
              expand="block"
              size="large"
              onClick={() => {
                this.handleEditShop();
              }}
              disabled={!this.name || !this.location}
            >
              Save Shop
            </ion-button>
          </ion-list>
        </div>
      </ion-content>
    ];
  }
}
