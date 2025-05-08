

export interface UserUpdateForm {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    birthdate: string;
    birthcity: string;
}
export interface PasswordUpdateForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string; 
}




export interface Credentials {
    email: string;
    password: string;
}
export interface CredentialsUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    birthdate: string;
    birthcity: string;
    token: string;
}
export interface CredentialsResponse {
    token: string;
    accessToken: string;
    user: CredentialsUser;
}


export interface ExtendedUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    role?: string | null;
    birthdate?: string | null;
    birthcity?: string | null;
}

export interface RegisterUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    password?: string | null; 
    firstname?: string | null;
    lastname?: string | null;
    role?: string | null;
    birthdate?: string | null;
    birthcity?: string | null;
}
export interface RegisterErrorForm {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    password?: string | null; 
    firstname?: string | null;
    lastname?: string | null;
    role?: string | null;
    birthdate?: string | null;
    birthcity?: string | null;
}