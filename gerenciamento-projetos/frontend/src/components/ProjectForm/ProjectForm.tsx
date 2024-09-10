import { Dispatch, SetStateAction, useState } from "react";
import { ProjectsService, ProjectType } from "../../services/projects.service";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Toast/Toast";
import "./ProjectForm.css";

interface ProjectFormProps {
  project?: ProjectType;
  setShowProjectForm: Dispatch<SetStateAction<boolean>>;
}

export function ProjectForm({ project, setShowProjectForm }: ProjectFormProps) {
  const { message, showToast } = useToast();
  const navigate = useNavigate();

  const [id, setId] = useState(project?.id);
  const [name, setName] = useState(project?.name);
  const [description, setDescription] = useState(project?.description);
  const [startDate, setStartDate] = useState(project?.startDate);
  const [endDate, setEndDate] = useState(project?.endDate);
  const [status, setStatus] = useState(project?.status);

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
      setShowProjectForm(false);
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
    <div className="project-form-container">
      <div className="project-form-container-2">
        <button
          type="button"
          className="project-form-close-button"
          onClick={() => setShowProjectForm(false)}
        >
          X
        </button>
        <form className="project-form">
          <input
            type="text"
            placeholder="Nome"
            className="project-form-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Descrição"
            className="project-form-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <input
            type="date"
            placeholder="Data de início"
            className="project-form-input"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
          <input
            type="date"
            placeholder="Data de finalização"
            className="project-form-input"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />

          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option selected value="Em andamento">
              Em andamento
            </option>
            <option value="Concluído">Concluído</option>
            <option value="Pendente">Pendente</option>
          </select>
          {id ? (
            <button
              type="button"
              className="project-form-update-button"
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
              className="project-form-create-button"
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
