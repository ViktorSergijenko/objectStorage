import { BaseEntity } from "./base.model";

export class User extends BaseEntity {
    fullName: string;
    email: string;
    password: string;
}

export class RegistrationVM {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export class LoginVM {
    email: string;
    password: string;
}