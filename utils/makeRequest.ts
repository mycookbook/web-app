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
    let access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmNvb2tib29rc2hxLmNvbS9hcGkvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTY5NzMyNjcxNywiZXhwIjoxNjk3NDEzMTE3LCJuYmYiOjE2OTczMjY3MTcsImp0aSI6IkQ5aVNXYVFSNU1BQWdFMDQiLCJzdWIiOiIzNiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.kPQjQFooP_8aiu9ExeF3BBhfVHwbmDmcbLQxpLscWmY"
    
    const {
        public: { tokenValidateEndpoint },
    } = useRuntimeConfig()
    return axios({
        url: tokenValidateEndpoint,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

export const makeLoginRequest = (accessToken: string) => {
    let access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmNvb2tib29rc2hxLmNvbS9hcGkvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTY5NzMyNjcxNywiZXhwIjoxNjk3NDEzMTE3LCJuYmYiOjE2OTczMjY3MTcsImp0aSI6IkQ5aVNXYVFSNU1BQWdFMDQiLCJzdWIiOiIzNiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.kPQjQFooP_8aiu9ExeF3BBhfVHwbmDmcbLQxpLscWmY"
    
    const {
        public: { tokenValidateEndpoint },
    } = useRuntimeConfig()
    return axios({
        url: tokenValidateEndpoint,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}
