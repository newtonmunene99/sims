import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "admin-shops",
  styleUrl: "admin-shops.scss"
})
export class AdminShops {
  @State() shops: Array<any> = [];
  addShopModal: HTMLIonModalElement;
  editShopModal: HTMLIonModalElement;
  assignEmployeeModal: HTMLIonModalElement;
  viewShopEmployeesModal: HTMLIonModalElement;
  shopSalesModal: HTMLIonModalElement;
  shopWasteModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentDidLoad() {
    this.getShops();
  }

  getShops() {
    this.shops = [];
    this.dataProvider
      .getShops()
      .then((results: any) => {
        this.shops = results.shops;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteShop(id: number) {
    this.dataProvider
      .deleteShop(id)
      .then((results: any) => {
        if (results.results.affectedRows == 1) {
        }
        this.getShops();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async showAddShopModal() {
    this.addShopModal = document.createElement("ion-modal");
    this.addShopModal.component = "add-shop";
    document.body.appendChild(this.addShopModal);

    this.addShopModal.present();

    const { data } = await this.addShopModal.onDidDismiss();

    if (data != null) {
      this.getShops();
    }
  }

  async showEditShopModal(shop) {
    this.editShopModal = document.createElement("ion-modal");

    this.editShopModal.component = "edit-shop";
    this.editShopModal.componentProps = { shop };

    document.body.appendChild(this.editShopModal);

    this.editShopModal.present();

    const { data } = await this.editShopModal.onDidDismiss();

    if (data != null) {
      this.getShops();
    }
  }

  async showAssignEmployeeModal(shopId: string) {
    this.assignEmployeeModal = document.createElement("ion-modal");
    this.assignEmployeeModal.component = "assign-employee";
    this.assignEmployeeModal.componentProps = {
      shopId
    };
    document.body.appendChild(this.assignEmployeeModal);

    this.assignEmployeeModal.present();

    const { data } = await this.assignEmployeeModal.onDidDismiss();

    if (data != null) {
      console.log(data);
    }
  }
  async showShopSalesModal(shopId: string, shopName: string) {
    this.shopSalesModal = document.createElement("ion-modal");
    this.shopSalesModal.component = "shop-sales";
    this.shopSalesModal.componentProps = {
      shopId,
      shopName
    };
    document.body.appendChild(this.shopSalesModal);

    this.shopSalesModal.present();
  }

  async showShopWasteModal(shopId: string, shopName: string) {
    this.shopWasteModal = document.createElement("ion-modal");
    this.shopWasteModal.component = "shop-waste";
    this.shopWasteModal.componentProps = {
      shopId,
      shopName
    };
    document.body.appendChild(this.shopWasteModal);

    this.shopWasteModal.present();
  }
  render() {
    return (
      <ion-content>
        <ion-button
          expand="block"
          size="large"
          onClick={() => {
            this.showAddShopModal();
          }}
        >
          Add Shop
        </ion-button>
        {this.shops.length > 0 ? (
          <div class="shops-wrapper">
            {this.shops.map(shop => (
              <ion-card mode="ios">
                <ion-img
                  src="../../assets/images/placeholder.png"
                  alt="Image"
                />
                <ion-card-content>
                  <ion-card-subtitle>{shop.location}</ion-card-subtitle>
                  <ion-card-title>{shop.name}</ion-card-title>
                  <ion-list inset>
                    <ion-item
                      onClick={() => {
                        this.showShopSalesModal(shop.id, shop.name);
                      }}
                    >
                      <ion-label>Shop Sales</ion-label>
                      <ion-icon slot="end" name="cart-outline"></ion-icon>
                    </ion-item>
                    <ion-item
                      onClick={() => {
                        this.showShopWasteModal(shop.id, shop.name);
                      }}
                    >
                      <ion-label>Shop Waste</ion-label>
                      <ion-icon slot="end" name="trash-bin-outline"></ion-icon>
                    </ion-item>
                    <ion-item
                      onClick={() => {
                        this.showAssignEmployeeModal(shop.id);
                      }}
                    >
                      <ion-label>Shop Employees</ion-label>
                      <ion-icon slot="end" name="people-outline"></ion-icon>
                    </ion-item>
                    <ion-item
                      onClick={() => {
                        this.showEditShopModal(shop);
                      }}
                    >
                      <ion-label>Edit Shop</ion-label>
                      <ion-icon slot="end" name="create-outline"></ion-icon>
                    </ion-item>
                    <ion-item
                      onClick={() => {
                        this.deleteShop(shop.id);
                      }}
                    >
                      <ion-label>Delete Shop</ion-label>
                      <ion-icon slot="end" name="trash-outline"></ion-icon>
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
