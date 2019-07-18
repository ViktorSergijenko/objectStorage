import { BaseEntity } from "./base.model";

export class User extends BaseEntity {
    fullName: string;
    email: string;
    password: string;

    roleName: string;
    hasAbilityToLoad: boolean;

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
    hasAbilityToLoad: boolean;
    userId: string;

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
    hasAbilityToLoad: boolean;


}

export class UserVM {
    id: string;
    fullName: string;
    email: string;
    roleName: string;
    hasAbilityToLoad: boolean;
    reportsTo: string;
    doesUserHaveAbilityToSeeProductAmount: boolean;
}
