import { IsEnum, IsNotEmpty } from "class-validator";
import { RoleTypes, UserType } from "../types/register.type";

export class RoleValidatorSchema {
  @IsNotEmpty()
  @IsEnum(RoleTypes)
  role: string;

  constructor(user: UserType) {
    this.role = user.role;
  }
}
