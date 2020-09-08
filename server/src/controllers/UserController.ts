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

@Controller("api/users")
export class UserController {
  @Get("all")
  @Middleware(JwtManager.middleware)
  private getUsers(request: ISecureRequest, response: Response) {
    database
      .query({ sql: "SELECT * FROM `user`" })
      .then(results => {
        return response.status(OK).json({ status: "success", users: results });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Get("employee/:id/shops")
  @Middleware(JwtManager.middleware)
  private getEmployeeShops(request: ISecureRequest, response: Response) {
    database
      .query({
        sql: "SELECT * FROM `employee` WHERE `userId`=?",
        values: [request.params.id]
      })
      .then(async results => {
        const joinedResults = [];
        for (const shop of results) {
          const shops = await database.query({
            sql: "SELECT * FROM `shop` WHERE `id`=?",
            values: [shop.shopId]
          });

          joinedResults.push({
            ...shop,
            shop: shops[0]
          });
        }
        return response
          .status(OK)
          .json({ status: "success", shops: joinedResults });
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
  private getShopEmployees(request: ISecureRequest, response: Response) {
    database
      .query({
        sql: "SELECT * FROM `employee` WHERE `shopId`=?",
        values: [request.params.id]
      })
      .then(async results => {
        const joinedResults = [];
        for (const employee of results) {
          const employees = await database.query({
            sql: "SELECT * FROM `user` WHERE `id`=?",
            values: [employee.userId]
          });

          joinedResults.push({
            ...employee,
            user: employees[0]
          });
        }
        return response
          .status(OK)
          .json({ status: "success", employees: joinedResults });
      })
      .catch(error => {
        return response.status(BAD_REQUEST).json({
          status: "failure",
          error
        });
      });
  }

  @Post("assign/shop")
  @Middleware(JwtManager.middleware)
  private assignUserToShop(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      const { userId, shopId } = request.body;
      database
        .query({
          sql: "INSERT INTO employee SET ?",
          values: {
            userId,
            shopId
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

  @Delete("delete-from-shop")
  @Middleware(JwtManager.middleware)
  private deleteUserFromShop(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      const { userId, shopId } = request.body;
      database
        .query({
          sql: "DELETE FROM `employee` WHERE `userId`=? AND `shopId`=?",
          values: [userId, shopId]
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

  @Put("employee/:id")
  @Middleware(JwtManager.middleware)
  private updateUser(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      database
        .query({
          sql: "SELECT * FROM `user` WHERE `id`=?",
          values: [request.params.id]
        })
        .then(results => {
          if (results.length == 1) {
            database
              .query({
                sql: "UPDATE user SET ? WHERE id=?",
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
              message: "We couldn't find any user with this Id"
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
}
