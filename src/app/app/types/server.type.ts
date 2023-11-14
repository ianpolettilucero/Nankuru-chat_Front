import { IChannel } from "./channel.type";
import { IUser } from "./user.type";

export interface IServer 
{
    id:number;
    name:string;
    description:string;
    channels:IChannel[];
    users:IUser[];
}