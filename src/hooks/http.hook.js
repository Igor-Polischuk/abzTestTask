import {
    useCallback,
    useState
} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {
        'Content-type': 'application/json'
    }) => {
        setLoading(true)
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            })

            if (!response.ok) {
                const data = await response.json()
                setLoading(false)
                return {...data, status: response.status}
                // throw new Error(`Could not fetch ${url}, status: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            setLoading(false)

            return data
        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        loading,
        request,
        error,
        clearError
    }
}