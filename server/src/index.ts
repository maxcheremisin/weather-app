import {Server} from 'server';
import {env} from 'config/env';
import {weatherRoute} from 'routes/weather';
import {ipRoute} from 'routes/ip';

const server = new Server(env.port, env.api, [weatherRoute, ipRoute]);

server.listen();

process
    .on('unhandledRejection', (reason, promise) => {
        console.error(`${reason} Unhandled Rejection at Promise ${promise}`);
    })
    .on('uncaughtException', error => {
        console.error(`${error} Uncaught Exception thrown`);
        process.exit(1);
    });
