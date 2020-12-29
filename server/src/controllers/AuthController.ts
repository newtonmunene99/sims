import { Request, Response } from 'express';
import { Controller, Post, Get, Middleware, Put } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { JwtManager, ISecureRequest } from '@overnightjs/jwt';
import { Logger } from '@overnightjs/logger';
import { database } from '../utils/database';

import { hash, compare } from 'bcrypt';
import { messenger } from '../utils/email';
@Controller('api/auth')
export class AuthController {
  @Post('login')
  private async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const results = await database.query({
        sql: 'SELECT * FROM `user` WHERE `email`=?',
        values: [email],
      });

      if (results.length != 1) {
        return response.status(StatusCodes.NOT_FOUND).json({
          status: 'failure',
          message: 'This email does not exist',
        });
      }

      const authenticated = await compare(password, results[0].password);

      if (!authenticated) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
          status: 'failure',
          message: 'Wrong email or password',
        });
      }

      const token = JwtManager.jwt({
        id: results[0].id,
        email: results[0].email,
        role: results[0].role,
        active: results[0].active,
      });

      return response.status(StatusCodes.OK).json({
        status: 'success',
        token,
        user: { ...results[0], password: null },
      });
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: 'failure',
        error,
      });
    }
  }

  @Post('register')
  @Middleware(JwtManager.middleware)
  private async addUser(request: ISecureRequest, response: Response) {
    if (request?.payload?.role != 1) {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        status: 'failure',
        message: "You don't have enough permissions to perform this operation",
      });
    }

    try {
      const { firstName, lastName, email, role } = request.body;

      const password = [...Array(10)]
        .map((_) => ((Math.random() * 36) | 0).toString(36))
        .join('');

      const hashedPassword = await hash(password, 10);

      const results = await database.query({
        sql: 'INSERT INTO user SET ?',
        values: {
          firstName,
          lastName,
          email,
          role,
          active: true,
          password: hashedPassword,
        },
      });

      await messenger.sendEmail(firstName, email, password, 'Welcome to SIMS');

      return response
        .status(StatusCodes.OK)
        .json({ status: 'success', results });
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: 'failure',
        error,
      });
    }
  }

  @Post('register-admin')
  private async registerAdmin(request: Request, response: Response) {
    try {
      const { firstName, lastName, email, password } = request.body;

      const admins = await database.query({
        sql: 'SELECT * FROM `user` WHERE `role`=?',
        values: [1],
      });

      if (admins.length > 0) {
        return response.status(StatusCodes.NOT_FOUND).json({
          status: 'failure',
          message: 'You cannot have more than one super admin',
        });
      }

      const hashedPassword = await hash(password, 10);

      const results = await database.query({
        sql: 'INSERT INTO user SET ?',
        values: {
          firstName,
          lastName,
          email,
          role: 1,
          active: true,
          password: hashedPassword,
        },
      });

      await messenger.sendEmail(firstName, email, password, 'Welcome to SIMS');

      return response
        .status(StatusCodes.OK)
        .json({ status: 'success', results });
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: 'failure',
        error,
      });
    }
  }

  @Put('update-password')
  @Middleware(JwtManager.middleware)
  private async updatePassword(request: ISecureRequest, response: Response) {
    try {
      const { oldPassword, newPassword } = request.body;

      const results = await database.query({
        sql: 'SELECT * FROM `user` WHERE `email`=?',
        values: [request.payload.email],
      });

      if (results.length != 1) {
        return response.status(StatusCodes.NOT_FOUND).json({
          status: 'failure',
          message: 'This email does not exist',
        });
      }
      const authenticated = await compare(oldPassword, results[0].password);

      if (!authenticated) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
          status: 'failure',
          message: 'Wrong email or password',
        });
      }
      const hashedPassword = await hash(newPassword, 10);

      const res = await database.query({
        sql: 'UPDATE user SET password=? WHERE id=?',
        values: [hashedPassword, results[0].id],
      });

      const token = JwtManager.jwt({
        id: results[0].id,
        email: results[0].email,
        role: results[0].role,
        active: results[0].active,
      });

      return response.status(StatusCodes.OK).json({
        status: 'success',
        token,
        user: { ...results[0], ...res, password: null },
      });
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: 'failure',
        error,
      });
    }
  }
}
