import { useState } from "react";
import {
  ProjectsService,
  ProjectStatus,
  ProjectType,
} from "../../services/projects.service";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Toast/Toast";
import { formatDateToISO } from "../../utils/format";
import { isEndDateValid, isStartDateValid } from "../../utils/validators";
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
    project?.startDate ? formatDateToISO(project?.startDate) : ""
  );
  const [endDate, setEndDate] = useState<string | undefined>(
    project?.endDate ? formatDateToISO(project?.endDate) : ""
  );
  const [status, setStatus] = useState(
    project?.status ?? ProjectStatus.EM_ANDAMENTO
  );

  async function handleCreate(project: Partial<ProjectType>) {
    await ProjectsService.getInstance().createProject(project);
  }

  async function handleUpdate(project: Partial<ProjectType>) {
    await ProjectsService.getInstance().updateProject(project);
  }

  async function handleClik(
    project: Partial<ProjectType>,
    operation: "CREATE" | "UPDATE"
  ) {
    if (!name) {
      showToast("Insira o nome do projeto para continuar.", {
        duration: 6000,
      });
      return;
    }

    if (!description) {
      showToast("Insira a descrição do projeto para continuar.", {
        duration: 6000,
      });
      return;
    }

    if (!startDate) {
      showToast("Insira a data de início do projeto para continuar..", {
        duration: 6000,
      });
      return;
    }

    if (!isStartDateValid(startDate)) {
      showToast("A data de início não deve ser menor do que a data atual.", {
        duration: 6000,
      });
      return;
    }

    if (!endDate) {
      showToast("Insira a data de finalização do projeto para continuar.", {
        duration: 6000,
      });
      return;
    }

    if (!isEndDateValid(endDate, startDate)) {
      showToast(
        "A data de finalização do projeto não deve ser menor do que a data de início.",
        {
          duration: 6000,
        }
      );
      return;
    }

    if (!status) {
      showToast("Selecione o status do projeto para continuar.", {
        duration: 6000,
      });
      return;
    }

    try {
      if (operation === "CREATE") {
        await handleCreate(project);
      }

      if (operation === "UPDATE") {
        await handleUpdate(project);
      }
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

          <button
            type="button"
            className={`button width-total ${
              id ? "button-green" : "button-blue"
            }`}
            onClick={() =>
              handleClik(
                {
                  id,
                  name,
                  description,
                  startDate,
                  endDate,
                  status,
                },
                id ? "UPDATE" : "CREATE"
              )
            }
          >
            {id ? "Atualizar" : "Criar"}
          </button>
        </form>
      </div>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
