import { BaseEntity } from "./base.model";

export class User extends BaseEntity {
    fullName: string;
    email: string;
    password: string;

    roleName: string;
}

export class RegistrationVM {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleName: string;
}
export class LoginVM {
    email: string;
    password: string;
}
export class ProfileInformationVM {
    fullName: string;
    email: string;
    basketId: string;
    roleName: string;
}

export class ChangePasswordViewModel {
    id: string;
    email: string;
    newPassword: string;
}

export class ChangeUserInfoViewModel {
    id: string;
    email: string;
    fullName: string;
    roleName: string;

}

export class UserVM {
    id: string;
    fullName: string;
    email: string;
    roleName: string;
}
