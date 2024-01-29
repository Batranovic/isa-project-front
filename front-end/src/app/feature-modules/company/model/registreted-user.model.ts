import { User } from "src/app/infrastructure/model/user.model";

export interface RegisteredUserModel { 
  id: number,
  penalPoints: number,
  user: User,
  userCategory: RegisteredUserCategory
}

export enum RegisteredUserCategory {
  REGULAR = 0, SILVER = 1, GOLD = 2
}