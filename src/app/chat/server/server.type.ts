import { IChannel } from "./channel/channel.type";

export interface IServer 
{
    id: number;
    name: string;
    picture: string;
    channels: IChannel[];
}