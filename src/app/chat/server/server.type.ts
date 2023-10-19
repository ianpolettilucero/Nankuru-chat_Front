import { IChannel } from "./channel/channel.type";

export interface IServer 
{
    name: string;
    picture: string;
    channels: IChannel[];
}