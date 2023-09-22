export interface User {
    email : string;
    id : number;
    name : string;
    createdAt : string;
    updatedAt : string;
    role : string;
}

export interface UserApiResponse {
    user:  User
}