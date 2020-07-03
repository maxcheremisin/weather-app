import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {AppStatus} from 'store';
import * as api from 'api';

interface IpAddressState {
    ip: null | string;
    status: AppStatus;
    error: null | unknown;
}

const initialState: IpAddressState = {
    ip: null,
    status: 'idle',
    error: null,
};

export const fetchIp = createAsyncThunk('ip/fetch', async () => {
    const res = await api.getIp();

    return res.address;
});

export const ipAddressReducer = createReducer(initialState, builder =>
    builder
        .addCase(fetchIp.pending, state => {
            state.status = 'loading';
        })
        .addCase(fetchIp.fulfilled, (state, action) => {
            state.ip = action.payload;
            state.error = null;
            state.status = 'success';
        })
        .addCase(fetchIp.rejected, (state, action) => {
            state.ip = null;
            state.error = action.payload;
            state.status = 'error';
        }),
);
