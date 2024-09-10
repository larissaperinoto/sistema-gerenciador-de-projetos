import { Dispatch, SetStateAction, useState } from "react";
import {
  ProjectsService,
  ProjectStatus,
  ProjectType,
} from "../../services/projects.service";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Toast/Toast";
import "./ProjectForm.css";

interface ProjectFormProps {
  project?: ProjectType;
  onClose: (status: boolean) => void;
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const { message, showToast } = useToast();
  const navigate = useNavigate();

  const [id, setId] = useState<string | undefined>(project?.id);
  const [name, setName] = useState<string | undefined>(project?.name);
  const [description, setDescription] = useState<string | undefined>(
    project?.description
  );
  const [startDate, setStartDate] = useState<string | undefined>(
    project?.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState<string | undefined>(
    project?.endDate
      ? new Date(project.endDate).toISOString().split("T")[0]
      : ""
  );
  const [status, setStatus] = useState(
    project?.status ?? ProjectStatus.EM_ANDAMENTO
  );

  function validateFields({
    name,
    description,
    startDate,
    endDate,
    status,
  }: Partial<ProjectType>) {
    if (!name) {
      showToast("Insira o nome do projeto para continuar.", {
        duration: 3000,
      });
    }

    if (!description) {
      showToast("Insira a descrição do projeto para continuar.", {
        duration: 3000,
      });
    }

    if (!startDate) {
      showToast("Insira a data de início do projeto para continuar.", {
        duration: 3000,
      });
    }

    if (!endDate) {
      showToast("Insira a data de finalização do projeto para continuar.", {
        duration: 3000,
      });
    }

    if (!status) {
      showToast("Selecione o status do projeto para continuar.", {
        duration: 3000,
      });
    }
  }

  async function handleCreateProject(project: Partial<ProjectType>) {
    validateFields(project);

    try {
      await ProjectsService.getInstance().createProject(project);
      onClose(false);
    } catch (e) {
      if ((e as Error).message === "Unauthorized") {
        navigate("/");
      } else {
        showToast((e as Error).message, {
          duration: 3000,
        });
      }
    }
  }

  async function handleUpdateProject(project: Partial<ProjectType>) {
    try {
      await ProjectsService.getInstance().updateProject(project);
      onClose(false);
    } catch (e) {
      if ((e as Error).message === "Unauthorized") {
        navigate("/");
      } else {
        showToast((e as Error).message, {
          duration: 3000,
        });
      }
    }
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <button
          type="button"
          className="modal-close-button"
          onClick={() => onClose(false)}
        >
          X
        </button>
        <form className="form">
          <input
            type="text"
            placeholder="Nome"
            className="input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Descrição"
            className="input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <input
            type="date"
            placeholder="Data de início"
            className="input"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
          <input
            type="date"
            placeholder="Data de finalização"
            className="input"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />

          <select
            onChange={(e) =>
              setStatus(e.target.value as unknown as ProjectStatus)
            }
            value={status}
            defaultValue={ProjectStatus.EM_ANDAMENTO}
            className="input"
          >
            <option value={ProjectStatus.EM_ANDAMENTO}>
              {ProjectStatus.EM_ANDAMENTO}
            </option>
            <option value={ProjectStatus.CONCLUIDO}>
              {ProjectStatus.CONCLUIDO}
            </option>
            <option value={ProjectStatus.PENDENTE}>
              {ProjectStatus.PENDENTE}
            </option>
          </select>
          {id ? (
            <button
              type="button"
              className="button button-green width-total"
              onClick={() =>
                handleUpdateProject({
                  id,
                  name,
                  description,
                  startDate,
                  endDate,
                  status,
                })
              }
            >
              Atualizar
            </button>
          ) : (
            <button
              type="button"
              className="button button-blue width-total"
              onClick={() =>
                handleCreateProject({
                  name,
                  description,
                  startDate,
                  endDate,
                  status,
                })
              }
            >
              Criar
            </button>
          )}
        </form>
      </div>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
