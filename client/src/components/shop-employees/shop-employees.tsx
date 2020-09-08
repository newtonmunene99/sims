import { Component, h } from "@stencil/core";

@Component({
  tag: "shop-employees",
  styleUrl: "shop-employees.scss",
  shadow: true
})
export class ShopEmployees {
  render() {
    return (
      <div>
        <p>Hello ShopEmployees!</p>
      </div>
    );
  }
}
