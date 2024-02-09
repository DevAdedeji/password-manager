import { type AxiosResponse } from "axios";
import { BaseApiService } from "../BaseService";
import { type UserAuthModel } from "./types";


export class AuthService extends BaseApiService {
    constructor(){
        super('/auth/')
    }
    public async register (data: UserAuthModel): Promise<AxiosResponse>{
        const response: AxiosResponse = await this.axiosInstance.post(`${this.getUrl()}register`, data)
        return response
        
    }
    public async login (data: UserAuthModel): Promise<AxiosResponse>{
       
        const response: AxiosResponse = await this.axiosInstance.post(`${this.getUrl()}login`, data)
        return response
        
    }
}