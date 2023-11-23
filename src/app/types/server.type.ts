import { IChannel } from "./channel.type";
import { IUser } from "./user.type";


export interface IServer 
{
    id:number;
    name:string;
    description:string;
    picture:string;
    channels:IChannel[];
    users:IUser[];

}
