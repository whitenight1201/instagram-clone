import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchPosts, resetPosts } from '../slices/post';

const useResetAndFetch = (currentPage: number) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetPosts());
        dispatch(fetchPosts(currentPage));
    }, [dispatch, currentPage]);
};

export default useResetAndFetch;
