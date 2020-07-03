import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from 'store';
import {fetchIp, RootState} from 'reducers';

export function useIpAddress() {
    const dispatch = useDispatch<AppDispatch>();

    const {ip, status} = useSelector((state: RootState) => state.ipAddress);

    const reload = useCallback(() => {
        dispatch(fetchIp());
    }, [dispatch]);

    useEffect(reload, [reload]);

    const isLoading = status === 'idle' || status === 'loading';

    return [ip, reload, isLoading] as const;
}
