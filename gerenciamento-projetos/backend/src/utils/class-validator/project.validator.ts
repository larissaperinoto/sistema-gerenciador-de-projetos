import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ProjectStatus, ProjectType } from "../types/project.type";

export class CreateProjectValidatorSchema {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string | undefined;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date | undefined;

  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  constructor(project: Partial<ProjectType>) {
    this.name = project.name!;
    this.description = project.description;
    this.startDate = project.startDate!;
    this.endDate = project.endDate;
    this.status = project.status!;
  }
}

export class UpdateProjectValidatorSchema {
  @IsOptional()
  @IsString()
  name: string | undefined;

  @IsOptional()
  @IsString()
  description: string | undefined;

  @IsOptional()
  @IsDateString()
  startDate: Date | undefined;

  @IsOptional()
  @IsDateString()
  endDate: Date | undefined;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status: ProjectStatus | undefined;

  constructor(project: Partial<ProjectType>) {
    this.name = project.name;
    this.description = project.description;
    this.startDate = project.startDate;
    this.endDate = project.endDate;
    this.status = project.status;
  }
}

export class InsertUserInProjectValidatorSchema {
  @IsNotEmpty()
  @IsString()
  userId: string | undefined;

  constructor(user: { userId: string }) {
    this.userId = user.userId;
  }
}
