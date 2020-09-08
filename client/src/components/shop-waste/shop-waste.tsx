import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "shop-waste",
  styleUrl: "shop-waste.scss"
})
export class ShopWaste {
  shopWasteModal: HTMLIonModalElement;
  dataProvider: DataProvider = new DataProvider();
  @State() waste = [];
  @State() shopName: string;
  @State() shopId: string;

  componentDidLoad() {
    this.shopWasteModal = document.querySelector("ion-modal");
    this.shopId = this.shopWasteModal.componentProps.shopId;
    this.shopName = this.shopWasteModal.componentProps.shopName;
    this.getWaste();
  }

  getWaste() {
    this.dataProvider
      .getShopWaste(this.shopId)
      .then((results: any) => {
        this.waste = results.waste;
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>{this.shopName} Waste</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.shopWasteModal.dismiss();
              }}
            >
              Cancel
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-grid>
          <ion-row class="table-header">
            <ion-col>Product</ion-col>
            <ion-col>Quantity</ion-col>
            <ion-col size="1">Gain</ion-col>
            <ion-col>Date</ion-col>
            <ion-col>Employee</ion-col>
          </ion-row>
          {this.waste.map(wasted => {
            var date = new Date(wasted.dateAdded);
            return (
              <ion-row>
                <ion-col>{wasted.product.name}</ion-col>
                <ion-col>
                  {wasted.quantity} {wasted.product.uom}
                </ion-col>
                <ion-col size="1">
                  {wasted.sellingPrice - wasted.buyingPrice}
                </ion-col>
                <ion-col>
                  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                </ion-col>
                <ion-col>{wasted.user.firstName}</ion-col>
              </ion-row>
            );
          })}
        </ion-grid>
      </ion-content>
    ];
  }
}
