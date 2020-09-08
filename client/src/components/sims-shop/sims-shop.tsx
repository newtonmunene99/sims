import { Component, h, Prop, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "sims-shop",
  styleUrl: "sims-shop.scss"
})
export class SimsShop {
  @State() stock = [];
  @Prop() id: string;

  simsCartEl: HTMLSimsCartElement;
  addStockModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentWillLoad() {
    this.getStock();
  }

  getStock() {
    this.dataProvider
      .getShopStock(this.id)
      .then((results: any) => {
        this.stock = results.stock;
      })
      .catch(error => {
        console.error(error);
      });
  }

  async showAddStockModal() {
    this.addStockModal = document.createElement("ion-modal");
    this.addStockModal.component = "add-stock";
    this.addStockModal.componentProps = {
      shopId: this.id
    };
    document.body.appendChild(this.addStockModal);

    this.addStockModal.present();

    const { data } = await this.addStockModal.onDidDismiss();

    if (data != null) {
      this.getStock();
    }
  }

  render() {
    return (
      <ion-content>
        <div class="stock-wrapper">
          {[null, ...this.stock].map(stock => {
            if (stock == null) {
              return (
                <ion-card
                  mode="ios"
                  color="primary"
                  class="add-stock-card"
                  onClick={() => {
                    this.showAddStockModal();
                  }}
                >
                  <ion-item lines="none">
                    <ion-icon name="add-outline" slot="start"></ion-icon>
                    <ion-card-subtitle>Add stock</ion-card-subtitle>
                  </ion-item>
                </ion-card>
              );
            } else {
              return (
                <ion-card mode="ios">
                  <ion-card-header>
                    <ion-card-title>{stock.product.name}</ion-card-title>
                    <ion-card-subtitle>
                      {stock.quantity} {stock.product.uom}
                    </ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-list inset>
                      <ion-item
                        onClick={() => {
                          this.simsCartEl.addToCart(stock);
                        }}
                      >
                        <ion-label>Add To Cart</ion-label>
                      </ion-item>
                    </ion-list>
                  </ion-card-content>
                </ion-card>
              );
            }
          })}
        </div>
        <sims-cart
          shopId={this.id}
          ref={el => (this.simsCartEl = el)}
          onCartOperationDone={() => {
            this.getStock();
          }}
        ></sims-cart>
      </ion-content>
    );
  }
}
