import axios, { AxiosRequestConfig } from 'axios'

export const makeRequest = (url: string, options: AxiosRequestConfig = {}) => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl
    const method = 'GET'
    return axios({
        url,
        method,
        baseURL,
        ...options,
    })
}

export const makeIpInfoRequest = () => {
    const {
        public: { ipInfoToken, ipInfoUri },
    } = useRuntimeConfig()
    return axios({
        url: ipInfoUri,
        params: {
            token: ipInfoToken,
        },
    })
}

export const makeTokenValidationRequest = (accessToken: string) => {
    const {
        public: { tokenValidateEndpoint },
    } = useRuntimeConfig()
    return axios({
        url: tokenValidateEndpoint,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

export const makeLoginRequest = (accessToken: string) => {
    const {
        public: { tokenValidateEndpoint },
    } = useRuntimeConfig()
    return axios({
        url: tokenValidateEndpoint,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}
