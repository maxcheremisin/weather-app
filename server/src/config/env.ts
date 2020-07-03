import dotenv from 'dotenv';

const found = dotenv.config();

if (!found) {
    throw new Error('Provide .env config');
}

export const env = {
    api: '/api',
    port: Number(process.env.PORT) || 8080,
    openWeatherMapApiKey: process.env.OPENWEATHERMAP_API_KEY || '',
};
