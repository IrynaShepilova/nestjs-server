import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../types/expressRequest.interface';
import { JWT_SECRET } from '../../config';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor( private readonly userService: UserService ) {
    }
    async use(req: ExpressRequest, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            console.log('no auth headers' );
            req.user = null;
            next();
            return;
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = verify(token, JWT_SECRET);
            const user = await this.userService.findById(decode.id);
            req.user = user;
            next();
        } catch (err) {
            req.user = null;
            console.log('error in middleware', err);
            next();
        }

    }
}