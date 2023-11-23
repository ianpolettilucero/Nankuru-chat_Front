import { IUser } from "src/app/types/user.type";
import { IChannel } from "./channel/channel.type";


@Input()
  id!: number;

  @Input()
  serverName!: string;
  
  @Input()
  pfp!: string;
  
  @Input()
  channels!: IChannel[];
