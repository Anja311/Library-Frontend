import { Role } from "../Role";

export class UserResponse{
    idUser!: number;
    username!: string;
    password!: string;
    name!: string;
    surname!: string;
    email!: string;
    dateOfBirth!: Date;
    idRole!: number;
    role!: Role;
}