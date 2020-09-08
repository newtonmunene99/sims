import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "edit-product",
  styleUrl: "edit-product.scss",
  shadow: true
})
export class EditProduct {
  @State() name: string;
  @State() uom: string;
  @State() bp: number;
  @State() sp: number;
  editProductModal: HTMLIonModalElement;
  dataProvider: DataProvider = new DataProvider();

  @State() product: any;

  componentDidLoad() {
    this.editProductModal = document.querySelector("ion-modal");
    this.product = this.editProductModal.componentProps.product;

    this.name = this.product.name;
    this.uom = this.product.uom;
    this.bp = this.product.buyingPrice;
    this.sp = this.product.sellingPrice;
  }

  handleEditProduct() {
    this.dataProvider
      .editProduct(this.name, this.uom, this.bp, this.sp, this.product.id)
      .then(results => {
        this.editProductModal.dismiss(results);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Edit product</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.editProductModal.dismiss();
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
                placeholder="Enter name of the product"
                value={this.name}
                onInput={(event: any) => {
                  this.name = event.target.value;
                }}
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">UoM</ion-label>
              <ion-input
                type="text"
                name="uom"
                required
                placeholder="Enter Unit of Measurement eg. Kg,Bunch,Pieces"
                value={this.uom}
                onInput={(event: any) => {
                  this.uom = event.target.value;
                }}
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Buying Price</ion-label>
              <ion-input
                type="number"
                name="bp"
                min="0"
                required
                placeholder="Enter buying price of the product"
                value={this.bp}
                onInput={(event: any) => {
                  this.bp = parseInt(event.target.value);
                }}
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Selling Price</ion-label>
              <ion-input
                type="number"
                name="sp"
                min="0"
                required
                placeholder="Enter selling price of the product"
                value={this.sp}
                onInput={(event: any) => {
                  this.sp = parseInt(event.target.value);
                }}
              ></ion-input>
            </ion-item>
            <ion-button
              fill="solid"
              expand="block"
              size="large"
              onClick={() => {
                this.handleEditProduct();
              }}
              disabled={!this.name || !this.uom || !this.bp || !this.sp}
            >
              Save Product
            </ion-button>
          </ion-list>
        </div>
      </ion-content>
    ];
  }
}
