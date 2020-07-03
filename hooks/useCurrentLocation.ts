import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from 'store';
import {fetchCurrentLocation, RootState} from 'reducers';

export function useCurrentLocation() {
    const dispatch = useDispatch<AppDispatch>();

    const {location, status} = useSelector((state: RootState) => state.currentLocation);

    const reload = useCallback(() => {
        dispatch(fetchCurrentLocation());
    }, [dispatch]);

    useEffect(reload, [reload]);

    const isLoading = status === 'idle' || status === 'loading';

    return [location, reload, isLoading] as const;
}
