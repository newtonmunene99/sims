import { Request, Response } from "express";
import { Controller, Post, Get, Middleware, Put } from "@overnightjs/core";
import {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  BAD_GATEWAY
} from "http-status-codes";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import { Logger } from "@overnightjs/logger";
import { database } from "../utils/database";

import { hash, compare } from "bcrypt";
import { messenger } from "../utils/email";
@Controller("api/auth")
export class AuthController {
  @Post("login")
  private login(request: Request, response: Response) {
    const { email, password } = request.body;
    database
      .query({
        sql: "SELECT * FROM `user` WHERE `email`=?",
        values: [email]
      })
      .then(results => {
        if (results.length == 1) {
          compare(password, results[0].password)
            .then(authenticated => {
              if (authenticated) {
                const token = JwtManager.jwt({
                  id: results[0].id,
                  email: results[0].email,
                  role: results[0].role,
                  active: results[0].active
                });

                return response.status(OK).json({
                  status: "success",
                  token,
                  user: { ...results[0], password: null }
                });
              } else {
                return response.status(UNAUTHORIZED).json({
                  status: "failure",
                  message: "Wrong email or password"
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
          return response.status(NOT_FOUND).json({
            status: "failure",
            message: "This email does not exist"
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

  @Post("register")
  @Middleware(JwtManager.middleware)
  private async addUser(request: ISecureRequest, response: Response) {
    if (request.payload.role == 1) {
      const { firstName, lastName, email, role } = request.body;
      const password = [...Array(10)]
        .map(_ => ((Math.random() * 36) | 0).toString(36))
        .join("");
      const hashedPassword = await hash(password, 10);
      database
        .query({
          sql: "INSERT INTO user SET ?",
          values: {
            firstName,
            lastName,
            email,
            role,
            active: true,
            password: hashedPassword
          }
        })
        .then(results => {
          messenger
            .sendEmail(firstName, email, password, "Welcome to SIMS")
            .then(() => {
              return response.status(OK).json({ status: "success", results });
            })
            .catch(error => {
              return response
                .status(BAD_GATEWAY)
                .json({ status: "failure", error });
            });
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

  @Put("update-password")
  @Middleware(JwtManager.middleware)
  private updatePassword(request: ISecureRequest, response: Response) {
    const { oldPassword, newPassword } = request.body;
    database
      .query({
        sql: "SELECT * FROM `user` WHERE `email`=?",
        values: [request.payload.email]
      })
      .then(results => {
        if (results.length == 1) {
          compare(oldPassword, results[0].password)
            .then(async authenticated => {
              if (authenticated) {
                const hashedPassword = await hash(newPassword, 10);

                database
                  .query({
                    sql: "UPDATE user SET password=? WHERE id=?",
                    values: [hashedPassword, results[0].id]
                  })
                  .then(res => {
                    const token = JwtManager.jwt({
                      id: results[0].id,
                      email: results[0].email,
                      role: results[0].role,
                      active: results[0].active
                    });

                    return response.status(OK).json({
                      status: "success",
                      token,
                      user: { ...results[0], ...res, password: null }
                    });
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
                  message: "Wrong email or password"
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
          return response.status(NOT_FOUND).json({
            status: "failure",
            message: "This email does not exist"
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
}
