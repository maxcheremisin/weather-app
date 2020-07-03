import express from 'express';
import requestIp from 'request-ip';
import {IpAddressDto} from 'types';

const route = express.Router();

export const ipRoute = (app: express.Router) => {
    app.use('/ip', route);

    route.get('/', async (req, res, next) => {
        try {
            const clientIp = requestIp.getClientIp(req);
            const dto: IpAddressDto = {address: clientIp};

            res.status(200).json(dto);
        } catch (error) {
            next(error);
        }
    });
};
