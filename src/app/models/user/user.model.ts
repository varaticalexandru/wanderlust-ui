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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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