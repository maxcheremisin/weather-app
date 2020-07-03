export type IpAddressDto = {
    address: string | null;
};

export type LocationDto = {
    coord: {lon: number; lat: number};
    weather: Array<{id: number; main: string; description: string}>;
    // eslint-disable-next-line camelcase
    main: {temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number};
    wind: {speed: number; deg: number};
    clouds: {all: number};
    name: string;
    cod: number;
};
