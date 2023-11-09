import { IMessage } from "./message.type";

export interface IChannel 
{
    id:number;
    name:string;
    description:string;
    messages:IMessage[];
}