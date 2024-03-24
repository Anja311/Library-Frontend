import { Permission } from "./Permission";

export class Role{
    idRole! : number;
    name!: string;
    permissions!: Permission[];
}