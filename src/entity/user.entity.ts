import { Role } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export class User {

    @Expose()
    id : number;

    @Expose()
    username : string;

    @Exclude()//memfilter kolom password dari backend
    password : string;

    @Expose()
    role : Role;
}