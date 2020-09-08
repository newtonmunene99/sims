import {
  Component,
  h,
  Method,
  State,
  Prop,
  Event,
  EventEmitter
} from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "sims-cart",
  styleUrl: "sims-cart.scss",
  shadow: true
})
export class SimsCart {
  @Prop() shopId: string;
  @State() stock = [];
  @State() isOpen: boolean = false;

  dataProvider: DataProvider = new DataProvider();
  @Event({
    eventName: "cartOperationDone"
  })
  cartOperationDone: EventEmitter;

  @Method()
  async addToCart(stock) {
    const itemIndex = this.stock.findIndex(st => st.id == stock.id);
    if (itemIndex >= 0) {
      this.stock[itemIndex].quantity = this.stock[itemIndex].quantity + 1;
      this.stock = [...this.stock];
    } else {
      this.stock = [
        ...this.stock,
        {
          id: stock.id,
          quantity: 1,
          product: stock.product,
          inStock: stock.quantity
        }
      ];
    }
  }

  @Method()
  async toggle() {
    this.isOpen = !this.isOpen;
  }

  handleSalesCheckout() {
    let cartItems = this.stock.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: item.product
    }));
    this.dataProvider
      .addOutgoing(this.shopId, cartItems, 1)
      .then(() => {
        this.stock = [];
        this.toggle();
        this.cartOperationDone.emit();
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleWasteCheckout() {
    let cartItems = this.stock.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: item.product
    }));
    this.dataProvider
      .addOutgoing(this.shopId, cartItems, 2)
      .then(() => {
        this.stock = [];
        this.toggle();
        this.cartOperationDone.emit();
      })
      .catch(error => {
        console.error(error);
      });
  }

  add(index: number) {
    if (this.stock[index].quantity < this.stock[index].inStock) {
      this.stock[index].quantity = this.stock[index].quantity + 1;
      this.stock = [...this.stock];
    }
  }

  remove(index: number) {
    if (this.stock[index].quantity > 1) {
      this.stock[index].quantity = this.stock[index].quantity - 1;
      this.stock = [...this.stock];
    }
  }

  render() {
    return [
      this.isOpen ? (
        <ion-backdrop
          tappable={this.isOpen}
          onIonBackdropTap={ev => {
            this.toggle();
          }}
        ></ion-backdrop>
      ) : null,
      <div class={`cart ${this.isOpen ? "open" : "closed"}`}>
        {this.isOpen ? (
          <div class="cart-items-wrapper">
            <ion-header color="primary">
              <ion-toolbar color="primary">
                <ion-title>Cart</ion-title>
                <ion-buttons slot="primary">
                  <ion-button
                    size="small"
                    shape="round"
                    fill="outline"
                    onClick={() => {
                      this.toggle();
                    }}
                  >
                    <ion-icon
                      slot="icon-only"
                      name="caret-down-outline"
                    ></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              {this.stock.length > 0 ? (
                <ion-list>
                  {this.stock.map((stock, index) => (
                    <ion-item>
                      <ion-label>{stock.product.name}</ion-label>
                      <ion-buttons slot="end">
                        <ion-button
                          size="small"
                          shape="round"
                          fill="clear"
                          onClick={() => {
                            this.remove(index);
                          }}
                        >
                          <ion-icon
                            slot="icon-only"
                            name="remove-outline"
                          ></ion-icon>
                        </ion-button>
                        <ion-button
                          size="small"
                          shape="round"
                          fill="clear"
                          disabled
                        >
                          <ion-label>{stock.quantity}</ion-label>
                        </ion-button>
                        <ion-button
                          size="small"
                          shape="round"
                          fill="clear"
                          onClick={() => {
                            this.add(index);
                          }}
                        >
                          <ion-icon
                            slot="icon-only"
                            name="add-outline"
                          ></ion-icon>
                        </ion-button>
                        <ion-button
                          size="small"
                          shape="round"
                          fill="clear"
                          onClick={() => {
                            this.stock.splice(index, 1);
                            this.stock = [...this.stock];
                          }}
                        >
                          <ion-icon
                            slot="icon-only"
                            name="trash-outline"
                            color="danger"
                          ></ion-icon>
                        </ion-button>
                      </ion-buttons>
                    </ion-item>
                  ))}
                  <ion-item>
                    <ion-label>Total</ion-label>
                    <ion-chip slot="end">
                      {this.stock.reduce(
                        (accumulator, item) =>
                          accumulator +
                          item.quantity * item.product.sellingPrice,
                        0
                      )}
                    </ion-chip>
                  </ion-item>
                </ion-list>
              ) : (
                <ion-text>No Items in the Cart currently</ion-text>
              )}
            </ion-content>
            <ion-footer>
              <ion-toolbar>
                <ion-buttons slot="primary">
                  <ion-button
                    color="primary"
                    shape="round"
                    fill="outline"
                    disabled={this.stock.length == 0}
                    onClick={() => {
                      this.handleWasteCheckout();
                    }}
                  >
                    Checkout as waste
                  </ion-button>
                  <ion-button
                    color="primary"
                    shape="round"
                    fill="outline"
                    disabled={this.stock.length == 0}
                    onClick={() => {
                      this.handleSalesCheckout();
                    }}
                  >
                    Checkout as sale
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-footer>
          </div>
        ) : (
          <div
            class={`cart-closed ${
              this.stock.length > 0 ? "has-data" : "no-data"
            }`}
            onClick={() => {
              this.toggle();
            }}
          >
            <ion-icon name="cart-outline"></ion-icon>
          </div>
        )}
      </div>
    ];
  }
}
