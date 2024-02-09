import { type AxiosResponse } from "axios";
import { BaseApiService } from "../BaseService";
import { type PasswordModel } from "./types";
import { useStorage } from "@/composables/storage";

export class PasswordService extends BaseApiService {
    constructor(){
        super('/password/')
    }
    private async setAuthorizationHeader(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `${token}`
    }
    private async init() {
        const { getItem } = useStorage()
        const token = await getItem("auth.token")
        if(token){
            this.setAuthorizationHeader(token)
        }
    }
    public async fetchPasswords (): Promise<AxiosResponse> {
        await this.init()
        const response: AxiosResponse = await this.axiosInstance.get('/user/me/details')
        return response
    }
    public async addPassword (data: PasswordModel): Promise<AxiosResponse> {
        await this.init()
        const response: AxiosResponse = await this.axiosInstance.post(`${this.getUrl()}`, data)
        return response
    }
    public async deletePassword (id: string): Promise<AxiosResponse> {
        await this.init()
        const response: AxiosResponse = await this.axiosInstance.delete(`${this.getUrl()}${id}`)
        return response
    }
    public async editPassword (id: string, data: PasswordModel): Promise<AxiosResponse> {
        await this.init()
        const response: AxiosResponse = await this.axiosInstance.put(`${this.getUrl()}${id}`, data)
        return response
    }
}
