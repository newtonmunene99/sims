import { Component, h, State } from "@stencil/core";
import { DataProvider } from "../../services/data";

@Component({
  tag: "sims-general",
  styleUrl: "sims-general.scss",
  shadow: true
})
export class SimsGeneral {
  @State() shops: Array<any> = [];
  @State() sales: Array<any> = [];
  @State() waste: Array<any> = [];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  dataProvider: DataProvider = new DataProvider();

  componentWillLoad() {
    this.getSales();
    this.getShops();
    this.getWaste();
  }

  getSales() {
    this.dataProvider
      .getAllSales()
      .then((results: any) => {
        console.log(results);
        this.sales = results.sales;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getWaste() {
    this.dataProvider
      .getAllWaste()
      .then((results: any) => {
        console.log(results);
        this.waste = results.waste;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getShops() {
    this.shops = [];
    this.dataProvider
      .getShops()
      .then((results: any) => {
        console.log(results);
        this.shops = results.shops;
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const allTimeMonthlySales = this.sales.reduce(
      (accumulator: any[], sale) => {
        const date = new Date(sale.dateAdded);
        const accumulatedSale = accumulator.find(
          sale => sale.month == this.months[date.getMonth()]
        );
        if (accumulatedSale) {
          accumulator[accumulator.indexOf(accumulatedSale)].total =
            accumulator[accumulator.indexOf(accumulatedSale)].total +
            sale.quantity * sale.sellingPrice;
        } else {
          accumulator.push({
            month: this.months[date.getMonth()],
            total: sale.quantity * sale.sellingPrice
          });
        }
        return accumulator;
      },
      this.months.map(month => ({ month, total: 0 }))
    );

    const currentYearMonthlySales = this.sales.reduce(
      (accumulator: any[], sale) => {
        const today = new Date();
        const date = new Date(sale.dateAdded);
        if (date.getFullYear == today.getFullYear) {
          const accumulatedSale = accumulator.find(
            sale => sale.month == this.months[date.getMonth()]
          );
          if (accumulatedSale) {
            accumulator[accumulator.indexOf(accumulatedSale)].total =
              accumulator[accumulator.indexOf(accumulatedSale)].total +
              sale.quantity * sale.sellingPrice;
          } else {
            accumulator.push({
              month: this.months[date.getMonth()],
              total: sale.quantity * sale.sellingPrice
            });
          }
        }

        return accumulator;
      },
      this.months.map(month => ({ month, total: 0 }))
    );

    const allTimeMonthlyWaste = this.waste.reduce(
      (accumulator: any[], waste) => {
        const date = new Date(waste.dateAdded);
        const accumulatedWaste = accumulator.find(
          waste => waste.month == this.months[date.getMonth()]
        );
        if (accumulatedWaste) {
          accumulator[accumulator.indexOf(accumulatedWaste)].total =
            accumulator[accumulator.indexOf(accumulatedWaste)].total +
            waste.quantity * waste.sellingPrice;
        } else {
          accumulator.push({
            month: this.months[date.getMonth()],
            total: waste.quantity * waste.sellingPrice
          });
        }
        return accumulator;
      },
      this.months.map(month => ({ month, total: 0 }))
    );

    const currentYearMonthlyWaste = this.waste.reduce(
      (accumulator: any[], waste) => {
        const today = new Date();
        const date = new Date(waste.dateAdded);
        if (date.getFullYear == today.getFullYear) {
          const accumulatedSale = accumulator.find(
            waste => waste.month == this.months[date.getMonth()]
          );
          if (accumulatedSale) {
            accumulator[accumulator.indexOf(accumulatedSale)].total =
              accumulator[accumulator.indexOf(accumulatedSale)].total +
              waste.quantity * waste.sellingPrice;
          } else {
            accumulator.push({
              month: this.months[date.getMonth()],
              total: waste.quantity * waste.sellingPrice
            });
          }
        }

        return accumulator;
      },
      this.months.map(month => ({ month, total: 0 }))
    );

    const currentYearShopSales = this.sales.reduce(
      (accumulator: any[], sale) => {
        const today = new Date();
        const date = new Date(sale.dateAdded);
        if (date.getFullYear == today.getFullYear) {
          const accumulatedShop = accumulator.find(
            shop => shop.id == sale.shopId
          );
          if (accumulatedShop) {
            accumulator[accumulator.indexOf(accumulatedShop)].total =
              accumulator[accumulator.indexOf(accumulatedShop)].total +
              sale.quantity * sale.sellingPrice;
          } else {
            accumulator.push({
              id: sale.shopId,
              name: sale.shop.name,
              total: sale.quantity * sale.sellingPrice
            });
          }
        }

        return accumulator;
      },
      this.shops.map(shop => ({ id: shop.id, name: shop.name, total: 0 }))
    );

    const allTimeShopSales = this.sales.reduce(
      (accumulator: any[], sale) => {
        const accumulatedShop = accumulator.find(
          shop => shop.id == sale.shopId
        );
        if (accumulatedShop) {
          accumulator[accumulator.indexOf(accumulatedShop)].total =
            accumulator[accumulator.indexOf(accumulatedShop)].total +
            sale.quantity * sale.sellingPrice;
        } else {
          accumulator.push({
            id: sale.shopId,
            name: sale.shop.name,
            total: sale.quantity * sale.sellingPrice
          });
        }

        return accumulator;
      },
      this.shops.map(shop => ({ id: shop.id, name: shop.name, total: 0 }))
    );

    const currentYearShopWaste = this.waste.reduce(
      (accumulator: any[], waste) => {
        const today = new Date();
        const date = new Date(waste.dateAdded);
        if (date.getFullYear == today.getFullYear) {
          const accumulatedShop = accumulator.find(
            shop => shop.id == waste.shopId
          );
          if (accumulatedShop) {
            accumulator[accumulator.indexOf(accumulatedShop)].total =
              accumulator[accumulator.indexOf(accumulatedShop)].total +
              waste.quantity * waste.sellingPrice;
          } else {
            accumulator.push({
              id: waste.shopId,
              name: waste.shop.name,
              total: waste.quantity * waste.sellingPrice
            });
          }
        }

        return accumulator;
      },
      this.shops.map(shop => ({ id: shop.id, name: shop.name, total: 0 }))
    );

    const allTimeShopWaste = this.waste.reduce(
      (accumulator: any[], waste) => {
        const accumulatedShop = accumulator.find(
          shop => shop.id == waste.shopId
        );
        if (accumulatedShop) {
          accumulator[accumulator.indexOf(accumulatedShop)].total =
            accumulator[accumulator.indexOf(accumulatedShop)].total +
            waste.quantity * waste.sellingPrice;
        } else {
          accumulator.push({
            id: waste.shopId,
            name: waste.shop.name,
            total: waste.quantity * waste.sellingPrice
          });
        }

        return accumulator;
      },
      this.shops.map(shop => ({ id: shop.id, name: shop.name, total: 0 }))
    );

    return (
      <ion-content>
        <div class="cards-wrapper">
          <ion-card mode="ios">
            <ion-card-header>
              <ion-card-title>{this.shops.length}</ion-card-title>
              <ion-card-subtitle>Shops</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card mode="ios">
            <ion-card-header>
              <ion-card-title>
                {" "}
                {this.sales.reduce(
                  (accumulator, sale) =>
                    accumulator + sale.quantity * sale.sellingPrice,
                  0
                )}{" "}
                KSH
              </ion-card-title>
              <ion-card-subtitle>In Total Sales</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
          <ion-card mode="ios">
            <ion-card-header>
              <ion-card-title>
                {" "}
                {this.sales.reduce(
                  (accumulator, sale) =>
                    accumulator + sale.quantity * sale.sellingPrice,
                  0
                ) -
                  this.sales.reduce(
                    (accumulator, sale) =>
                      accumulator + sale.quantity * sale.buyingPrice,
                    0
                  )}{" "}
                KSH
              </ion-card-title>
              <ion-card-subtitle>In Total Profit</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
          <ion-card mode="ios">
            <ion-card-header>
              <ion-card-title>
                {this.waste.reduce(
                  (accumulator, waste) =>
                    accumulator + waste.quantity * waste.buyingPrice,
                  0
                )}{" "}
                KSH
              </ion-card-title>
              <ion-card-subtitle>In Total Waste/Loss</ion-card-subtitle>
            </ion-card-header>
          </ion-card>

          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>Current Year Monthly Sales</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="bar"
                series={[
                  {
                    name: "sales",
                    data: currentYearMonthlySales.map(sale => sale.total)
                  }
                ]}
                options={{
                  xaxis: {
                    categories: currentYearMonthlySales.map(sale => sale.month)
                  }
                }}
              />
            </ion-card-content>
          </ion-card>
          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>All Time Monthly Sales</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="bar"
                series={[
                  {
                    name: "sales",
                    data: allTimeMonthlySales.map(sale => sale.total)
                  }
                ]}
                options={{
                  xaxis: {
                    categories: allTimeMonthlySales.map(sale => sale.month)
                  }
                }}
              />
            </ion-card-content>
          </ion-card>
          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>Current Year Monthly Waste</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="bar"
                series={[
                  {
                    name: "waste",
                    data: currentYearMonthlyWaste.map(waste => waste.total)
                  }
                ]}
                options={{
                  xaxis: {
                    categories: currentYearMonthlyWaste.map(
                      waste => waste.month
                    )
                  }
                }}
              />
            </ion-card-content>
          </ion-card>
          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>All Time Monthly Waste</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="bar"
                series={[
                  {
                    name: "waste",
                    data: allTimeMonthlyWaste.map(waste => waste.total)
                  }
                ]}
                options={{
                  xaxis: {
                    categories: allTimeMonthlyWaste.map(waste => waste.month)
                  }
                }}
              />
            </ion-card-content>
          </ion-card>
          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>Current Year Shop Sales</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="donut"
                series={currentYearShopSales.map(sale => sale.total)}
                options={{
                  dataLabels: {
                    enabled: false
                  },
                  fill: {
                    type: "gradient"
                  },
                  labels: currentYearShopSales.map(sale => sale.name)
                }}
              />
            </ion-card-content>
          </ion-card>
          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>All Time Shop Sales</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="donut"
                series={allTimeShopSales.map(sale => sale.total)}
                options={{
                  dataLabels: {
                    enabled: false
                  },
                  fill: {
                    type: "gradient"
                  },
                  labels: allTimeShopSales.map(sale => sale.name)
                }}
              />
            </ion-card-content>
          </ion-card>

          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>Current Year Shop Waste</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="donut"
                series={currentYearShopWaste.map(waste => waste.total)}
                options={{
                  dataLabels: {
                    enabled: false
                  },
                  fill: {
                    type: "gradient"
                  },
                  labels: currentYearShopWaste.map(waste => waste.name)
                }}
              />
            </ion-card-content>
          </ion-card>
          <ion-card class="large" mode="ios">
            <ion-card-header>
              <ion-card-subtitle>All Time Shop Waste</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <apex-chart
                type="donut"
                series={allTimeShopWaste.map(waste => waste.total)}
                options={{
                  dataLabels: {
                    enabled: false
                  },
                  fill: {
                    type: "gradient"
                  },
                  labels: allTimeShopWaste.map(waste => waste.name)
                }}
              />
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    );
  }
}
