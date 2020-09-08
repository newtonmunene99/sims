import { Request, Response } from "express";
import {
  Controller,
  Post,
  Get,
  Middleware,
  Delete,
  Put
} from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { database } from "../utils/database";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import { BAD_REQUEST, OK, UNAUTHORIZED, NOT_FOUND } from "http-status-codes";

@Controller("api/inventory")
export class InventoryController {
  @Get("shop")
  @Middleware(JwtManager.middleware)
  private getShops(request: ISecureRequest, response: Response) {
    database
      .query({ sql: "SELECT * FROM shop" })
      .then(results => {
        return response.status(OK).json({ status: "success", shops: results });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Get("shop/:id")
  @Middleware(JwtManager.middleware)
  private getShop(request: ISecureRequest, response: Response) {
    database
      .query({
        sql: "SELECT * FROM `shop` WHERE `id`=?",
        values: [request.params.id]
      })
      .then(results => {
        if (results.length == 1) {
          return response
            .status(OK)
            .json({ status: "success", shop: results[0] });
        } else {
          return response.status(NOT_FOUND).json({
            status: "failure",
            message: "We couldn't find any shop with this Id"
          });
        }
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Put("shop/:id")
  @Middleware(JwtManager.middleware)
  private updateShop(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      database
        .query({
          sql: "SELECT * FROM `shop` WHERE `id`=?",
          values: [request.params.id]
        })
        .then(results => {
          if (results.length == 1) {
            database
              .query({
                sql: "UPDATE shop SET ? WHERE id=?",
                values: [request.body, results[0].id]
              })
              .then(res => {
                return response.status(OK).json({ status: "success", ...res });
              })
              .catch(error => {
                return response.status(BAD_REQUEST).json({
                  status: "failure",
                  error
                });
              });
          } else {
            return response.status(NOT_FOUND).json({
              status: "failure",
              message: "We couldn't find any shop with this Id"
            });
          }
        })
        .catch(error => {
          return response.status(BAD_REQUEST).json({
            status: "failure",
            error
          });
        });
    } else {
      return response.status(UNAUTHORIZED).json({
        status: "failure",
        message: "You don't have enough permissions to perform this operation"
      });
    }
  }

  @Delete("shop/:id")
  @Middleware(JwtManager.middleware)
  private deleteShop(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      database
        .query({
          sql: "SELECT * FROM `shop` WHERE `id`=?",
          values: [request.params.id]
        })
        .then(results => {
          if (results.length == 1) {
            database
              .query({
                sql: "DELETE FROM `shop` WHERE `id`=?",
                values: [results[0].id]
              })
              .then(results => {
                return response.status(OK).json({ status: "success", results });
              })
              .catch(error => {
                return response.status(BAD_REQUEST).json({
                  status: "failure",
                  error
                });
              });
          } else {
            return response.status(NOT_FOUND).json({
              status: "failure",
              message: "We couldn't find any shop with this Id"
            });
          }
        })
        .catch(error => {
          return response.status(BAD_REQUEST).json({
            status: "failure",
            error
          });
        });
    } else {
      return response.status(UNAUTHORIZED).json({
        status: "failure",
        message: "You don't have enough permissions to perform this operation"
      });
    }
  }

  @Post("shop/add")
  @Middleware(JwtManager.middleware)
  private addShop(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      const { name, location } = request.body;
      database
        .query({
          sql: "INSERT INTO shop SET ?",
          values: {
            name,
            location
          }
        })
        .then(results => {
          return response.status(OK).json({ status: "success", results });
        })
        .catch(error => {
          return response.status(BAD_REQUEST).json({
            status: "failure",
            error
          });
        });
    } else {
      return response.status(UNAUTHORIZED).json({
        status: "failure",
        message: "You don't have enough permissions to perform this operation"
      });
    }
  }

  @Get("products")
  @Middleware(JwtManager.middleware)
  private getProducts(request: ISecureRequest, response: Response) {
    database
      .query({ sql: "SELECT * FROM product" })
      .then(results => {
        return response.status(OK).json({ status: "success", results });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Post("product/add")
  @Middleware(JwtManager.middleware)
  private addProduct(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      const { name, uom, buyingPrice, sellingPrice } = request.body;
      database
        .query({
          sql: "INSERT INTO product SET ?",
          values: {
            name,
            uom,
            buyingPrice,
            sellingPrice
          }
        })
        .then(results => {
          return response.status(OK).json({ status: "success", results });
        })
        .catch(error => {
          return response.status(BAD_REQUEST).json({
            status: "failure",
            error
          });
        });
    } else {
      return response.status(UNAUTHORIZED).json({
        status: "failure",
        message: "You don't have enough permissions to perform this operation"
      });
    }
  }

  @Get("product/:id")
  @Middleware(JwtManager.middleware)
  private getProduct(request: ISecureRequest, response: Response) {
    database
      .query({
        sql: "SELECT * FROM `product` WHERE `id`=?",
        values: [request.params.id]
      })
      .then(results => {
        if (results.length == 1) {
          return response
            .status(OK)
            .json({ status: "success", product: results[0] });
        } else {
          return response.status(NOT_FOUND).json({
            status: "failure",
            message: "We couldn't find any product with this Id"
          });
        }
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Put("product/:id")
  @Middleware(JwtManager.middleware)
  private updateProduct(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      database
        .query({
          sql: "SELECT * FROM `product` WHERE `id`=?",
          values: [request.params.id]
        })
        .then(results => {
          if (results.length == 1) {
            database
              .query({
                sql: "UPDATE product SET ? WHERE id=?",
                values: [request.body, results[0].id]
              })
              .then(res => {
                return response.status(OK).json({ status: "success", ...res });
              })
              .catch(error => {
                return response.status(BAD_REQUEST).json({
                  status: "failure",
                  error
                });
              });
          } else {
            return response.status(NOT_FOUND).json({
              status: "failure",
              message: "We couldn't find any product with this Id"
            });
          }
        })
        .catch(error => {
          return response.status(BAD_REQUEST).json({
            status: "failure",
            error
          });
        });
    } else {
      return response.status(UNAUTHORIZED).json({
        status: "failure",
        message: "You don't have enough permissions to perform this operation"
      });
    }
  }

  @Delete("product/:id")
  @Middleware(JwtManager.middleware)
  private deleteProduct(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      database
        .query({
          sql: "SELECT * FROM `product` WHERE `id`=?",
          values: [request.params.id]
        })
        .then(results => {
          if (results.length == 1) {
            database
              .query({
                sql: "DELETE FROM `product` WHERE `id`=?",
                values: [results[0].id]
              })
              .then(results => {
                return response.status(OK).json({ status: "success", results });
              })
              .catch(error => {
                return response.status(BAD_REQUEST).json({
                  status: "failure",
                  error
                });
              });
          } else {
            return response.status(NOT_FOUND).json({
              status: "failure",
              message: "We couldn't find any product with this Id"
            });
          }
        })
        .catch(error => {
          return response.status(BAD_REQUEST).json({
            status: "failure",
            error
          });
        });
    } else {
      return response.status(UNAUTHORIZED).json({
        status: "failure",
        message: "You don't have enough permissions to perform this operation"
      });
    }
  }

  @Get("stock")
  @Middleware(JwtManager.middleware)
  private getStock(request: ISecureRequest, response: Response) {
    database
      .query({ sql: "SELECT * FROM stock" })
      .then(results => {
        return response.status(OK).json({ status: "success", results });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Get("stock/shop/:id")
  @Middleware(JwtManager.middleware)
  private getShopStock(request: ISecureRequest, response: Response) {
    database
      .query({
        sql: "SELECT * FROM `stock` WHERE `shop`=?",
        values: [request.params.id]
      })
      .then(async results => {
        const joinedResults: Array<any> = [];

        for (const stock of results) {
          const products = await database.query({
            sql: "SELECT * FROM `product` WHERE `id`=?",
            values: [stock.product]
          });

          joinedResults.push({
            ...stock,
            product: products[0]
          });
        }

        return response
          .status(OK)
          .json({ status: "success", stock: joinedResults });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Post("stock/add")
  @Middleware(JwtManager.middleware)
  private addStock(request: ISecureRequest, response: Response) {
    const { product, quantity, shop } = request.body;
    database
      .query({
        sql: "INSERT INTO stock SET ?",
        values: {
          product,
          quantity,
          shop
        }
      })
      .then(results => {
        return response.status(OK).json({ status: "success", results });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Post("outgoing/add")
  @Middleware(JwtManager.middleware)
  private async addOutgoing(request: ISecureRequest, response: Response) {
    try {
      console.log(request.body);
      const { shopId, stock, outgoingAction } = request.body;

      for (const item of stock) {
        await database.query({
          sql: "INSERT INTO outgoing SET ?",
          values: {
            shopId,
            productId: item.product.id,
            quantity: item.quantity,
            userId: request.payload.id,
            buyingPrice: item.product.buyingPrice,
            sellingPrice: item.product.sellingPrice,
            outgoingAction
          }
        });

        const prod = (
          await database.query({
            sql: "SELECT * FROM `stock` WHERE id=?",
            values: [item.id]
          })
        )[0];

        await database.query({
          sql: "UPDATE stock SET quantity=? WHERE id=?",
          values: [prod.quantity - item.quantity, item.id]
        });
      }
      return response.status(OK).json({ status: "success" });
    } catch (error) {
      return response.status(BAD_REQUEST).json({
        status: "failure",
        error
      });
    }
  }

  @Get("outgoing/sales")
  @Middleware(JwtManager.middleware)
  private async getOutgoingSales(request: ISecureRequest, response: Response) {
    try {
      let results: any;
      if (request.payload.role == 1) {
        results = await database.query({
          sql: "SELECT * FROM `outgoing` WHERE `outgoingAction`=?",
          values: [1]
        });
      } else {
        results = await database.query({
          sql:
            "SELECT * FROM `outgoing` WHERE `outgoingAction`=? AND `userId`=?",
          values: [1, request.payload.id]
        });
      }
      const joinedResults: Array<any> = [];

      for (const outgoing of results) {
        const products = await database.query({
          sql: "SELECT * FROM `product` WHERE `id`=?",
          values: [outgoing.productId]
        });

        const shops = await database.query({
          sql: "SELECT * FROM `shop` WHERE `id`=?",
          values: [outgoing.shopId]
        });

        const users = await database.query({
          sql: "SELECT * FROM `user` WHERE `id`=?",
          values: [outgoing.userId]
        });

        joinedResults.push({
          ...outgoing,
          product: products[0],
          shop: shops[0],
          user: users[0]
        });
      }
      return response
        .status(OK)
        .json({ status: "success", sales: joinedResults });
    } catch (error) {
      return response.status(BAD_REQUEST).json({
        status: "failure",
        error
      });
    }
  }

  @Get("outgoing/waste")
  @Middleware(JwtManager.middleware)
  private async getOutgoingWaste(request: ISecureRequest, response: Response) {
    try {
      let results: any;
      if (request.payload.role == 1) {
        results = await database.query({
          sql: "SELECT * FROM `outgoing` WHERE `outgoingAction`=?",
          values: [2]
        });
      } else {
        results = await database.query({
          sql:
            "SELECT * FROM `outgoing` WHERE `outgoingAction`=? AND `userId`=?",
          values: [2, request.payload.id]
        });
      }
      const joinedResults: Array<any> = [];

      for (const outgoing of results) {
        const products = await database.query({
          sql: "SELECT * FROM `product` WHERE `id`=?",
          values: [outgoing.productId]
        });

        const shops = await database.query({
          sql: "SELECT * FROM `shop` WHERE `id`=?",
          values: [outgoing.shopId]
        });

        const users = await database.query({
          sql: "SELECT * FROM `user` WHERE `id`=?",
          values: [outgoing.userId]
        });

        joinedResults.push({
          ...outgoing,
          product: products[0],
          shop: shops[0],
          user: users[0]
        });
      }
      return response
        .status(OK)
        .json({ status: "success", waste: joinedResults });
    } catch (error) {
      return response.status(BAD_REQUEST).json({
        status: "failure",
        error
      });
    }
  }

  @Get("outgoing/sales/shop/:id")
  @Middleware(JwtManager.middleware)
  private async getShopOutgoingSales(
    request: ISecureRequest,
    response: Response
  ) {
    try {
      let results: any;
      if (request.payload.role == 1) {
        results = await database.query({
          sql:
            "SELECT * FROM `outgoing` WHERE `outgoingAction`=? AND `shopId`=?",
          values: [1, request.params.id]
        });
      } else {
        results = await database.query({
          sql:
            "SELECT * FROM `outgoing` WHERE `outgoingAction`=? AND `userId`=? AND `shopId`=?",
          values: [1, request.payload.id, request.params.id]
        });
      }
      const joinedResults: Array<any> = [];

      for (const outgoing of results) {
        const products = await database.query({
          sql: "SELECT * FROM `product` WHERE `id`=?",
          values: [outgoing.productId]
        });

        const shops = await database.query({
          sql: "SELECT * FROM `shop` WHERE `id`=?",
          values: [outgoing.shopId]
        });

        const users = await database.query({
          sql: "SELECT * FROM `user` WHERE `id`=?",
          values: [outgoing.userId]
        });

        joinedResults.push({
          ...outgoing,
          product: products[0],
          shop: shops[0],
          user: users[0]
        });
      }
      return response
        .status(OK)
        .json({ status: "success", sales: joinedResults });
    } catch (error) {
      return response.status(BAD_REQUEST).json({
        status: "failure",
        error
      });
    }
  }

  @Get("outgoing/waste/shop/:id")
  @Middleware(JwtManager.middleware)
  private async getShopOutgoingWaste(
    request: ISecureRequest,
    response: Response
  ) {
    try {
      let results: any;
      if (request.payload.role == 1) {
        results = await database.query({
          sql:
            "SELECT * FROM `outgoing` WHERE `outgoingAction`=? AND `shopId`=?",
          values: [2, request.params.id]
        });
      } else {
        results = await database.query({
          sql:
            "SELECT * FROM `outgoing` WHERE `outgoingAction`=? AND `userId`=? AND `shopId`=?",
          values: [2, request.payload.id, request.params.id]
        });
      }
      const joinedResults: Array<any> = [];

      for (const outgoing of results) {
        const products = await database.query({
          sql: "SELECT * FROM `product` WHERE `id`=?",
          values: [outgoing.productId]
        });

        const shops = await database.query({
          sql: "SELECT * FROM `shop` WHERE `id`=?",
          values: [outgoing.shopId]
        });

        const users = await database.query({
          sql: "SELECT * FROM `user` WHERE `id`=?",
          values: [outgoing.userId]
        });

        joinedResults.push({
          ...outgoing,
          product: products[0],
          shop: shops[0],
          user: users[0]
        });
      }
      return response
        .status(OK)
        .json({ status: "success", waste: joinedResults });
    } catch (error) {
      return response.status(BAD_REQUEST).json({
        status: "failure",
        error
      });
    }
  }
}
