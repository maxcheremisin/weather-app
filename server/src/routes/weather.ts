import express from 'express';
import fetch from 'node-fetch';
import {env} from 'config/env';
import {LocationDto} from 'types';

const route = express.Router();

const openWeatherAppBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';

type Coords = {
    lat: number;
    lon: number;
};

async function fetchLocation(name: string): Promise<LocationDto>;
async function fetchLocation(coords: Coords): Promise<LocationDto>;
async function fetchLocation(nameOrCoords: string | Coords): Promise<LocationDto> {
    const url =
        typeof nameOrCoords === 'string'
            ? `${openWeatherAppBaseUrl}?q=${nameOrCoords}&appid=${env.openWeatherMapApiKey}&units=metric`
            : `${openWeatherAppBaseUrl}?lat=${nameOrCoords.lat}&lon=${nameOrCoords.lon}&appid=${env.openWeatherMapApiKey}&units=metric`;

    const response = await fetch(url);
    const dto: LocationDto = await response.json();

    if (dto.cod !== 200) {
        throw new Error('Something went wrong');
    }

    return dto;
}

export const weatherRoute = (app: express.Router) => {
    app.use('/weather', route);

    route.get('/search', async (req, res, next) => {
        try {
            const name = req.query.name as string;
            const response = await fetchLocation(name);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    });

    route.get('/', async (req, res, next) => {
        try {
            const lat = Number(req.query.lat);
            const lon = Number(req.query.lon);
            const response = await fetchLocation({lat, lon});

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    });
};
