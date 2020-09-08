import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "admin-products",
  styleUrl: "admin-products.scss"
})
export class AdminProducts {
  @State() products: Array<any> = [];

  addProductModal: HTMLIonModalElement;
  editProductModal: HTMLIonModalElement;

  dataProvider: DataProvider = new DataProvider();

  componentWillLoad() {
    this.getProducts();
  }

  getProducts() {
    this.products = [];
    this.dataProvider
      .getProducts()
      .then((results: any) => {
        this.products = results.results;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteProduct(id: number) {
    this.dataProvider
      .deleteProduct(id)
      .then((results: any) => {
        if (results.results.affectedRows == 1) {
        }
        this.getProducts();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async showAddProductModal() {
    this.addProductModal = document.createElement("ion-modal");
    this.addProductModal.component = "add-product";
    document.body.appendChild(this.addProductModal);
    this.addProductModal.present();
    const { data } = await this.addProductModal.onDidDismiss();

    if (data != null) {
      this.getProducts();
    }
  }

  async showEditProductModal(product) {
    this.editProductModal = document.createElement("ion-modal");
    this.editProductModal.component = "edit-product";
    this.editProductModal.componentProps = {
      product
    };
    document.body.appendChild(this.editProductModal);
    this.editProductModal.present();
    const { data } = await this.editProductModal.onDidDismiss();

    if (data != null) {
      this.getProducts();
    }
  }
  render() {
    return (
      <ion-content>
        <ion-button
          size="large"
          onClick={() => {
            this.showAddProductModal();
          }}
        >
          Add Product
        </ion-button>
        <div id="products-table">
          <ion-grid>
            <ion-row class="table-header">
              <ion-col>Name</ion-col>
              <ion-col size="2">UoM</ion-col>
              <ion-col size="2">Buying Price</ion-col>
              <ion-col size="2">Selling Price</ion-col>
              <ion-col></ion-col>
            </ion-row>
            {this.products.map(product => (
              <ion-row>
                <ion-col>{product.name}</ion-col>
                <ion-col size="2">{product.uom}</ion-col>
                <ion-col size="2">{product.buyingPrice}</ion-col>
                <ion-col size="2">{product.sellingPrice}</ion-col>
                <ion-col>
                  <ion-button
                    size="small"
                    shape="round"
                    fill="clear"
                    onClick={() => {
                      this.showEditProductModal(product);
                    }}
                  >
                    <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                  </ion-button>
                  <ion-button
                    size="small"
                    shape="round"
                    fill="clear"
                    onClick={() => {
                      this.deleteProduct(product.id);
                    }}
                  >
                    <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            ))}
          </ion-grid>
        </div>
      </ion-content>
    );
  }
}
