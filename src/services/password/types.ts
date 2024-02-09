export interface PasswordModel {
    site: string
    password: string
}

export interface PasswordEntity {
    _id: string
    userId: string
    site: string
    password: string
    createdAt: string
    updatedAt: string
    __v: number
}