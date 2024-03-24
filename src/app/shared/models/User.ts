import { Role } from "./Role";

export class User{
    idUser!: number;
    username!: string;
    name!: string;
    surname!: string;
    email!: string;
    dateOfBirth!: string;
    isDeleted!: string;
    role!: Role;
}