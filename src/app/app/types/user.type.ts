import { IEnemy } from "./enemy.type";
import { IFriend } from "./friend.type";

export interface IUser 
{
  description: string;
  email:       string;
  id:          number;
  pfp:         string;
  username:    string;
  friends:     IFriend[];
  enemies:     IEnemy[];
}

export function defaultIUser():IUser
{
  return {
    description: '', 
    email:       '',
    id:          0,
    pfp:         '',
    username:    '',
    friends:     [],
    enemies:     []    
  }
}