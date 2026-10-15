import { Tecnology } from "./tecnology";


export interface Project{
    id?:string;
    name:string;
    description:string
    tecnologies:Tecnology[]
}