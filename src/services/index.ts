import { AuthService } from "./auth";
import { PasswordService } from "./password"

export const $api = {
    auth: new AuthService(),
    password: new PasswordService(),
}