import {combineReducers} from '@reduxjs/toolkit';
import {ipAddressReducer} from './ipAddress';
import {currentLocationReducer} from './currentLocation';
import {searchLocationReducer} from './searchLocation';

export const rootReducer = combineReducers({
    ipAddress: ipAddressReducer,
    currentLocation: currentLocationReducer,
    searchLocation: searchLocationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
