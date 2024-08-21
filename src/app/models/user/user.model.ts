export interface UserLogin {
    email: string;
    password: string;
}

export interface AuthResponse {
    jwt: string;
    id: string;
    email: string;
}

export interface UserRegister {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserUpdate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
}


export interface UserDetails {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
}