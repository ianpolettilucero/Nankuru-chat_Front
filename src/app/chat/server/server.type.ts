import { IUser } from "src/app/types/user.type";
import { IChannel } from "./channel/channel.type";

export interface IServer 
{
    id: number;
    name: string;
    picture: string;
    channels: IChannel[];
    users: IUser[];
}