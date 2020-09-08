import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "shop-sales",
  styleUrl: "shop-sales.scss"
})
export class ShopSales {
  shopSalesModal: HTMLIonModalElement;
  dataProvider: DataProvider = new DataProvider();
  @State() sales = [];
  @State() shopName: string;
  @State() shopId: string;

  componentDidLoad() {
    this.shopSalesModal = document.querySelector("ion-modal");
    this.shopId = this.shopSalesModal.componentProps.shopId;
    this.shopName = this.shopSalesModal.componentProps.shopName;
    this.getSales();
  }

  getSales() {
    this.dataProvider
      .getShopSales(this.shopId)
      .then((results: any) => {
        console.log(results);
        this.sales = results.sales;
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>{this.shopName} Sales</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.shopSalesModal.dismiss();
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
          {this.sales.map(sale => {
            var date = new Date(sale.dateAdded);
            return (
              <ion-row>
                <ion-col>{sale.product.name}</ion-col>
                <ion-col>
                  {sale.quantity} {sale.product.uom}
                </ion-col>
                <ion-col size="1">
                  {sale.sellingPrice - sale.buyingPrice}
                </ion-col>
                <ion-col>
                  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                </ion-col>
                <ion-col>{sale.user.firstName}</ion-col>
              </ion-row>
            );
          })}
        </ion-grid>
      </ion-content>
    ];
  }
}
