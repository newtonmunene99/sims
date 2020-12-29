import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "sims-shops",
  styleUrl: "sims-shops.scss",
  shadow: true,
})
export class SimsShops {
  shopSalesModal: HTMLIonModalElement;
  shopWasteModal: HTMLIonModalElement;
  dataProvider: DataProvider = new DataProvider();
  user;
  @State() shops = [];
  componentWillLoad() {
    this.user = JSON.parse(localStorage.getItem("sims-user"));
    this.dataProvider
      .getEmployeeShops(this.user.id)
      .then((results: any) => {
        this.shops = results.shops;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async showShopSalesModal(shopId: string, shopName: string) {
    this.shopSalesModal = document.createElement("ion-modal");
    this.shopSalesModal.component = "shop-sales";
    this.shopSalesModal.componentProps = {
      shopId,
      shopName,
    };
    document.body.appendChild(this.shopSalesModal);

    this.shopSalesModal.present();
  }

  async showShopWasteModal(shopId: string, shopName: string) {
    this.shopWasteModal = document.createElement("ion-modal");
    this.shopWasteModal.component = "shop-waste";
    this.shopWasteModal.componentProps = {
      shopId,
      shopName,
    };
    document.body.appendChild(this.shopWasteModal);

    this.shopWasteModal.present();
  }
  render() {
    return (
      <ion-content>
        {this.shops.length > 0 ? (
          <div class="shops-wrapper">
            {this.shops.map((shop) => (
              <ion-card mode="ios">
                <ion-img
                  src="../../assets/images/placeholder.png"
                  alt="Image"
                />
                <ion-card-content>
                  <ion-card-subtitle>{shop.shop.location}</ion-card-subtitle>
                  <ion-card-title>{shop.shop.name}</ion-card-title>
                  <ion-list inset>
                    <ion-item href={"/dashboard/shops/" + shop.shopId}>
                      <ion-label>Open Shop</ion-label>
                    </ion-item>
                    <ion-item
                      onClick={() => {
                        this.showShopSalesModal(shop.shopId, shop.shop.name);
                      }}
                    >
                      <ion-label>Shop Sales</ion-label>
                      <ion-icon slot="end" name="cart-outline"></ion-icon>
                    </ion-item>
                    <ion-item
                      onClick={() => {
                        this.showShopWasteModal(shop.shopId, shop.shop.name);
                      }}
                    >
                      <ion-label>Shop Waste</ion-label>
                      <ion-icon slot="end" name="trash-bin-outline"></ion-icon>
                    </ion-item>
                  </ion-list>
                </ion-card-content>
              </ion-card>
            ))}
          </div>
        ) : (
          <div class="shops-wrapper">
            {[null].map(() => (
              <ion-card mode="ios">
                <ion-img
                  src="../../assets/images/placeholder.png"
                  alt="Image"
                />
                <ion-card-content>
                  <ion-card-subtitle>
                    Please be patient while we fetch your shops
                  </ion-card-subtitle>
                  <ion-card-title>Loading</ion-card-title>
                </ion-card-content>
              </ion-card>
            ))}
          </div>
        )}
      </ion-content>
    );
  }
}
