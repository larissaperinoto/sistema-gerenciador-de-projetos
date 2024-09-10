import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { UserType, RoleTypes } from "../types/register.type";

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

export class RegisterUserValidatorSchema {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(RoleTypes)
  role: string;

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
    this.name = register.name;
    this.email = register.email;
    this.role = register.role;
    this.password = register.password;
  }
}
