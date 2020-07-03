import {createAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {LocationDto} from 'server/src/types';
import {AppStatus} from 'store';
import * as api from 'api';

interface SearchLocationState {
    location: null | LocationDto;
    searchInput: string;
    status: AppStatus;
    error: null | unknown;
}

const initialState: SearchLocationState = {
    location: null,
    searchInput: '',
    status: 'idle',
    error: null,
};

export const searchLocation = createAsyncThunk('searchLocation/fetch', (search: string) => {
    return api.searchLocation(search);
});

export const enterSearch = createAction<string>('searchLocation/enterSearch');

export const searchLocationReducer = createReducer(initialState, builder =>
    builder
        .addCase(enterSearch, (state, action) => {
            state.searchInput = action.payload;
        })
        .addCase(searchLocation.pending, state => {
            state.status = 'loading';
        })
        .addCase(searchLocation.fulfilled, (state, action) => {
            state.location = action.payload;
            state.error = null;
            state.status = 'success';
        })
        .addCase(searchLocation.rejected, (state, action) => {
            state.location = null;
            state.error = action.payload;
            state.status = 'error';
        }),
);
