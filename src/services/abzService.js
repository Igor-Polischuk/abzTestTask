import {
    useHttp
} from "../hooks/http.hook";

export default function useABZService() {
    const startPage = 1

    const {
        request,
        loading,
        error,
        clearError
    } = useHttp()

    const get = async (page = startPage) => {
        const getUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`;
        const data = await request(getUrl)
        return transformData(data)
    }

    const post = async data => {
        const token = await request('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        const response = await request('https://frontend-test-assignment-api.abz.agency/api/v1/users', 'POST', data, {
            'Token': token.token,
        })
        return response
    }

    const transformData = data => {
        return {
            next: data.links.next_url,
            users: data.users
        }
    }

    return {
        get,
        post,
        loading,
        error,
        clearError
    }
}