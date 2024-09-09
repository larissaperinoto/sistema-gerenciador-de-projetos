export type ProjectType = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
};

export enum ProjectStatus {
  EM_ANDAMENTO = "Em andamento",
  CONCLUIDO = "Concluído",
  PENDENTE = "Pendente",
}
