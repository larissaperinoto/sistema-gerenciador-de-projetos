import { useEffect, useState } from "react";
import { ProjectsService, ProjectType } from "../../services/projects.service";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../ProjectForm/ProjectForm";
import { ModalAlert } from "../ModalAlert/ModalAlert";
import { formatDateToString } from "../../utils/format";
import "./Projects.css";

export function Projects() {
  const { message, showToast } = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
  const [showRemoveProjectAlert, setShowRemoveProjectAlert] =
    useState<boolean>(false);
  const [projectSelected, setProjectSelected] = useState<ProjectType>();

  async function handleRemoveProject(projectId: string) {
    try {
      await ProjectsService.getInstance().removeProject(projectId);
      setProjects((prev) => prev.filter(({ id }) => id !== projectId));
      setShowRemoveProjectAlert(false);
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
        className="button button-top-right button-blue"
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
            <th>Membros</th>
          </tr>
        </thead>
        <tbody className="projects-table-body">
          {projects.map(
            ({ id, name, description, startDate, endDate, status }) => {
              return (
                <tr key={id}>
                  <th>{name}</th>
                  <th>{description}</th>
                  <th>{formatDateToString(startDate)}</th>
                  <th>{formatDateToString(endDate)}</th>
                  <th>{status}</th>
                  <th>
                    <button
                      type="button"
                      className="button button-green"
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
                      className="button button-red"
                      onClick={() => {
                        setShowRemoveProjectAlert(true);
                        setProjectSelected({
                          id,
                          name,
                          description,
                          startDate,
                          endDate,
                          status,
                        });
                      }}
                    >
                      Excluir
                    </button>
                  </th>
                  <th>
                    <button
                      type="button"
                      className="button"
                      onClick={() => navigate(`/project/${id}/members`)}
                    >
                      Ver membros
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
      {showRemoveProjectAlert && (
        <ModalAlert
          text={`Tem certeza de que deseja prosseguir na remoção do projeto ${projectSelected?.name}?`}
          onClose={setShowRemoveProjectAlert}
          actionButton={
            <button
              type="button"
              className="button button-red"
              onClick={() => handleRemoveProject(projectSelected?.id!)}
            >
              Remover
            </button>
          }
        />
      )}
    </div>
  );
}
