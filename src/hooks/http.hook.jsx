import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestToMyServer = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true);

        try {
            const responseFromMyServer = await fetch(url, {method, body, headers});

            if (!responseFromMyServer.ok) {
                throw new Error(`Could not fetch ${url}, status: ${responseFromMyServer.status}`);
            }
            
            const marvelData = await responseFromMyServer.json();

            setLoading(false);
            return marvelData;

        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, clearError, requestToMyServer};
}