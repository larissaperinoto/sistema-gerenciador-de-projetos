import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { UserType } from "../types/register.type";
import { RoleValidatorSchema } from "./user.validator";

export class LoginValidatorSchema {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(login: { email: string; password: string }) {
    this.email = login.email;
    this.password = login.password;
  }
}

export class RegisterUserValidatorSchema extends RoleValidatorSchema {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  )
  password: string;

  constructor(register: UserType) {
    super(register);
    this.name = register.name;
    this.email = register.email;
    this.password = register.password;
  }
}
