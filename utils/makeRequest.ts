import axios, { AxiosRequestConfig } from 'axios'

export const makeRequest = (url: string, options: AxiosRequestConfig = {}) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl
  const method = 'GET'
  return axios({
    url,
    baseURL,
    method,
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
