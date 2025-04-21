import {useEffect, useState} from "react";

export function useFetch(fetchFn, initialData = []) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialData);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return {
        isFetching,
        setIsFetching,
        error,
        setError,
        fetchedData,
        setFetchedData
    };
}
