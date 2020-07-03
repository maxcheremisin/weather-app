import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {LocationDto} from 'server/src/types';
import {AppStatus} from 'store';
import * as api from 'api';

interface CurrentLocationState {
    location: null | LocationDto;
    status: AppStatus;
    error: null | unknown;
}

const initialState: CurrentLocationState = {
    location: null,
    status: 'idle',
    error: null,
};

export const fetchCurrentLocation = createAsyncThunk(
    'currentLocation/fetch',
    () =>
        new Promise<LocationDto>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                const {longitude, latitude} = position.coords;

                api.getCurrentLocation(longitude, latitude).then(resolve).catch(reject);
            }, reject);
        }),
);

export const currentLocationReducer = createReducer(initialState, builder =>
    builder
        .addCase(fetchCurrentLocation.pending, state => {
            state.status = 'loading';
        })
        .addCase(fetchCurrentLocation.fulfilled, (state, action) => {
            state.location = action.payload;
            state.error = null;
            state.status = 'success';
        })
        .addCase(fetchCurrentLocation.rejected, (state, action) => {
            state.location = null;
            state.error = action.payload;
            state.status = 'error';
        }),
);
