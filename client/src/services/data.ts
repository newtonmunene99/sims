const baseUrl = "http://localhost:3000";
export class DataProvider {
  constructor() {}

  updateUser(
    firstName: string,
    lastName: string,
    role: number,
    active: number,
    employeeId: string
  ) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/users/employee/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          role,
          active
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addShop(name: string, location: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/shop/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          name,
          location
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getShop(shopId: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/shop/${shopId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getShops() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/shop`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  editShop(name: string, location: string, shopId: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/shop/${shopId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          name,
          location
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteShop(shopId: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/shop/${shopId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addProduct(
    name: string,
    uom: string,
    buyingPrice: number,
    sellingPrice: number
  ) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/product/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          name,
          uom,
          buyingPrice,
          sellingPrice
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getProduct(productId: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/product/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  editProduct(
    name: string,
    uom: string,
    buyingPrice: number,
    sellingPrice: number,
    productId: number
  ) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          name,
          uom,
          buyingPrice,
          sellingPrice
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteProduct(productId: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addStock(product: number, quantity: number, shop: number) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/stock/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          product,
          quantity,
          shop
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getShopStock(shopId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/stock/shop/${shopId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getEmployeeShops(userId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/users/employee/${userId}/shops`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getShopEmployees(shopId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/users/shop/${shopId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  assignUserShop(userId: string, shopId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/users/assign/shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          userId,
          shopId
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  deleteUserFromShop(userId: string, shopId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/users/delete-from-shop`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          userId,
          shopId
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addOutgoing(shopId: string, stock: any[], outgoingAction: 1 | 2) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/outgoing/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        },
        body: JSON.stringify({
          shopId,
          stock,
          outgoingAction
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAllSales() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/outgoing/sales`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getShopSales(shopId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/outgoing/sales/shop/${shopId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAllWaste() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/outgoing/waste`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getShopWaste(shopId: string) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/api/inventory/outgoing/waste/shop/${shopId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("sims-token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
