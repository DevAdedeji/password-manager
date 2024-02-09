import { type AxiosResponse } from "axios";
import { BaseApiService } from "../BaseService";
import { type PasswordModel } from "./types";

export class PasswordService extends BaseApiService {
    constructor(){
        super('/password/')
    }
    public async fetchPasswords (): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.get('/user/me/details')
        return response
    }
    public async addPassword (data: PasswordModel): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.post(`${this.getUrl()}`, data)
        return response
    }
    public async deletePassword (id: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.delete(`${this.getUrl()}${id}`)
        return response
    }
    public async editPassword (id: string, data: PasswordModel): Promise<AxiosResponse> {
        const response: AxiosResponse = await this.axiosInstance.put(`${this.getUrl()}${id}`, data)
        return response
    }
}