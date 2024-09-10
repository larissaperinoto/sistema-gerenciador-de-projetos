import { useEffect, useState } from "react";
import { ProjectsService, ProjectType } from "../../services/projects.service";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../ProjectForm/ProjectForm";
import "./Projects.css";

export function Projects() {
  const { message, showToast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
  const [projectSelected, setProjectSelected] = useState<ProjectType>();

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

  async function handleSelectProject(project: ProjectType) {
    setProjectSelected(project);
    setShowProjectForm(true);
  }

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
  }, [showProjectForm]);

  return (
    <div className="projects-table-container">
      <h1>Projetos</h1>
      <button
        type="button"
        className="add-project-button"
        onClick={() => setShowProjectForm(true)}
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
                  <th>{formatDate(endDate)}</th>
                  <th>{status}</th>
                  <th>
                    <button
                      type="button"
                      className="projects-table-edit-button"
                      onClick={() =>
                        handleSelectProject({
                          id,
                          name,
                          description,
                          startDate,
                          endDate,
                          status,
                        })
                      }
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
      {showProjectForm && (
        <ProjectForm
          setShowProjectForm={setShowProjectForm}
          project={projectSelected}
        />
      )}
    </div>
  );
}
