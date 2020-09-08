import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "add-shop",
  styleUrl: "add-shop.scss"
})
export class AddShop {
  @State() name: string;
  @State() location: string;

  addShopModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentDidLoad() {
    this.addShopModal = document.querySelector("ion-modal");
  }

  handleAddShop() {
    this.dataProvider
      .addShop(this.name, this.location)
      .then(results => {
        this.addShopModal.dismiss(results);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Add new shop</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.addShopModal.dismiss();
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
                this.handleAddShop();
              }}
              disabled={!this.name || !this.location}
            >
              Add Shop
            </ion-button>
          </ion-list>
        </div>
      </ion-content>
    ];
  }
}
