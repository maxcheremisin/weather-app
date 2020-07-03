import {IpAddressDto, LocationDto} from 'server/src/types';

const request = async <T>(url: string): Promise<T> => {
    const res = await fetch(`http://localhost:8080/api/${url}`);

    if (!res.ok) {
        throw res;
    }

    return res.json();
};

export const getIp = () => request<IpAddressDto>('ip');
export const getCurrentLocation = (lon: number, lat: number) => request<LocationDto>(`weather?lon=${lon}&lat=${lat}`);
export const searchLocation = (name: string) => request<LocationDto>(`weather/search?name=${name}`);
