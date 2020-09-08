import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "add-stock",
  styleUrl: "add-stock.scss",
  shadow: true
})
export class AddStock {
  @State() productId: number;
  @State() quantity: number;
  @State() shopId: number;
  @State() product;
  @State() products = [];

  addStockModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentWillLoad() {
    this.dataProvider
      .getProducts()
      .then((results: any) => {
        this.products = results.results;
        if (results.results.length > 0) {
          this.productId = results.results[0].id;
          this.product = results.results[0];
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidLoad() {
    this.addStockModal = document.querySelector("ion-modal");
    this.shopId = this.addStockModal.componentProps.shopId;
  }

  handleAddStock() {
    this.dataProvider
      .addStock(this.productId, this.quantity, this.shopId)
      .then(results => {
        this.addStockModal.dismiss(results);
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return [
      <ion-header color="primary">
        <ion-toolbar color="primary">
          <ion-title>Add new stock</ion-title>
          <ion-buttons slot="primary">
            <ion-button
              onClick={() => {
                this.addStockModal.dismiss();
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
              <ion-label>Choose a product</ion-label>
              <select
                id="products"
                name="products"
                multiple={false}
                onChange={(ev: any) => {
                  this.productId = ev.target.value;
                  this.product = this.products.find(
                    product => product.id == ev.target.value
                  );
                }}
              >
                {this.products.map(product => (
                  <option value={product.id}>{product.name}</option>
                ))}
              </select>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">
                Quantity in {this.product.uom}
              </ion-label>
              <ion-input
                type="number"
                name="quantity"
                required
                placeholder="Enter quantity of the product"
                value={this.quantity}
                min="1"
                onInput={(event: any) => {
                  this.quantity = event.target.value;
                }}
              ></ion-input>
            </ion-item>

            <ion-button
              fill="solid"
              expand="block"
              size="large"
              onClick={() => {
                this.handleAddStock();
              }}
              disabled={!this.product || !this.quantity || !this.shopId}
            >
              Add Product
            </ion-button>
          </ion-list>
        </div>
      </ion-content>
    ];
  }
}
