import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useStorage } from "@/composables/storage";
export class BaseApiService {
    private readonly BASE_URL = import.meta.env.VITE_APP_API_BASE_URL
    public axiosInstance: AxiosInstance
    private config: AxiosRequestConfig
    resource

    constructor (resource: string) {
        if(!resource) throw new Error('Resource is not provided')
        this.resource = resource
        this.config = {
            baseURL: this.BASE_URL
        }
        this.axiosInstance = axios.create(this.config)
        this.init()
    }
    private async init() {
        const { getItem } = useStorage()
        const token = await getItem("auth.token")
        if(token){
            this.setAuthorizationHeader(token)
        }
    }
    private async setAuthorizationHeader(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `${token}`
    }
    public getUrl(){
        return this.resource
    }
}