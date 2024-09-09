import { useEffect, useState } from "react";
import { ProjectsService, ProjectType } from "../../services/projects.service";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

export function Projects() {
  const { message, showToast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  async function handleRemoveProject(e: any, projectId: string) {
    e.preventDefault();
    try {
      await ProjectsService.getInstance().removeProject(projectId);
    } catch (e) {
      if ((e as Error).message === "Unauthorized") {
        navigate("/");
      } else {
        showToast((e as Error).message, {
          duration: 6000,
        });
      }
    }
  }

  function handleCreateProject() {}

  useEffect(() => {
    async function requestProjects() {
      try {
        const projectList = await ProjectsService.getInstance().getProjects();
        setProjects(projectList);
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
    requestProjects();
  }, []);

  return (
    <div className="projects-table-container">
      <h1>Projetos</h1>
      <button
        type="button"
        className="add-project-button"
        onClick={() => handleCreateProject()}
      >
        + Adicionar
      </button>
      <table className="projects-table">
        <thead className="projects-table-header">
          <tr>
            <th>Projeto</th>
            <th>Descrição</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="projects-table-body">
          {projects.map(
            ({ id, name, description, startDate, endDate, status }) => {
              return (
                <tr key={id}>
                  <th>{name}</th>
                  <th>{description}</th>
                  <th>{formatDate(startDate)}</th>
                  <th>{endDate}</th>
                  <th>{status}</th>
                  <th>
                    <button
                      type="button"
                      className="projects-table-edit-button"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="projects-table-remove-button"
                      onClick={(e) => handleRemoveProject(e, id!)}
                    >
                      Excluir
                    </button>
                  </th>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
