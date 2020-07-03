import express from 'express';
import cors from 'cors';
import {errorHandler} from 'utils/error-handler';

type Route = (app: express.Router) => void;

export class Server {
    public server: express.Application;
    public port: number;
    public prefix = '/';

    constructor(port: Server['port'], prefix: Server['prefix'], routes: Route[]) {
        this.server = express();
        this.port = port;
        this.prefix = prefix;

        this.init(routes);
    }

    private init(routes: Route[]) {
        const app = express.Router();

        routes.forEach(route => route(app));

        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(this.prefix, app);
        this.server.use(errorHandler);
    }

    public listen(): void {
        this.server.listen(this.port, () => {
            console.log(`Server listening on the port ${this.port}`);
        });
    }
}
