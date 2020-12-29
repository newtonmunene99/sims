import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { database } from '../utils/database';

@Controller('api/setup')
export class SetupController {
  @Get()
  private async setup(request: Request, response: Response) {
    try {
      const { authorization } = request.headers;

      const credentials = Buffer.from(
        authorization?.split(' ')[1],
        'base64',
      ).toString();

      const username = process.env.MASTER_USERNAME;
      const password = process.env.MASTER_PASSWORD;

      if (credentials && credentials === `${username}:${password}`) {
        await database.seedDatabase();

        return response.status(StatusCodes.OK).json({
          status: 'success',
        });
      }

      response.status(StatusCodes.UNAUTHORIZED).json({
        status: 'failure',
        message: "You're not authorized to perform this operation",
      });
    } catch (error) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        status: 'failure',
        error,
      });
    }
  }
}
