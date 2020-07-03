import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from 'store';
import {enterSearch, RootState, searchLocation} from 'reducers';
import {useDebounce} from 'hooks/useDebounce';

export function useSearchLocation() {
    const dispatch = useDispatch<AppDispatch>();
    const {searchInput, location, status} = useSelector((state: RootState) => state.searchLocation);

    const setSearch = useCallback((text: string) => dispatch(enterSearch(text)), [dispatch]);

    const searchTerm = useDebounce(searchInput, 300);

    useEffect(() => {
        if (searchTerm) {
            dispatch(searchLocation(searchTerm));
        }
    }, [searchTerm, dispatch]);

    return {
        location,
        search: searchInput,
        setSearch,
        isLoading: status === 'loading',
    };
}
