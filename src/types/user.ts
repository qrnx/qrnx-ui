import { Model } from "./api";
import { ClitentRoles } from "./clientRoles";

export type UserBase = {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  maxPolls: number;
  clientRole: ClitentRoles;
};

export type User = Model<UserBase>;
