import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { RegisterType, RoleTypes } from "../types/register.type";

export class LoginValidatorSchema {
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

  constructor(login: { email: string; password: string }) {
    this.email = login.email;
    this.password = login.password;
  }
}

export class RegisterUserValidatorSchema extends LoginValidatorSchema {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(RoleTypes)
  role: string;

  constructor(register: RegisterType) {
    super(register);
    this.name = register.name;
    this.role = register.role;
  }
}
