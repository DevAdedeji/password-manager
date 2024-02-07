import { type AxiosResponse } from "axios";
import { BaseApiService } from "../BaseService";
import { type UserAuthType } from "./types";


export class AuthService extends BaseApiService {
    constructor(){
        super('/auth/')
    }
    public async register (data: UserAuthType): Promise<AxiosResponse>{
        const response: AxiosResponse = await this.axiosInstance.post(`${this.getUrl()}register`, data)
        return response
        
    }
    public async login (data: UserAuthType): Promise<AxiosResponse>{
       
        const response: AxiosResponse = await this.axiosInstance.post(`${this.getUrl()}login`, data)
        return response
        
    }
}