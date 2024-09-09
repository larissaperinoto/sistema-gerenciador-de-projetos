export type RegisterType = {
  name: string;
  email: string;
  password: string;
  role: RoleTypes;
};

export enum RoleTypes {
  DESENVOLVEDOR = "Desenvolvedor",
  GERENTE = "Gerente",
  DESIGNER = "Designer",
}
