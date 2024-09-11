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
      showToast((e as Error).message, {
        duration: 6000,
      });
    }
  }

  useEffect(() => {
    async function requestProjects() {
      try {
        const projectList = await ProjectsService.getInstance().getProjects();
        setProjects(projectList);
      } catch (e) {
        showToast((e as Error).message, {
          duration: 3000,
        });
      }
    }
    requestProjects();
    setProjectSelected(undefined);
  }, [showProjectForm, showRemoveProjectAlert]);

  return (
    <div className="container">
      <div className="container-flex">
        <h1 className="title-h1">Projetos</h1>
        <button
          type="button"
          className="button button-blue"
          onClick={() => setShowProjectForm(true)}
        >
          + Adicionar
        </button>
      </div>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Status</th>
            <th>Ações</th>
            <th>Membros</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {projects.map(
            ({ id, name, description, startDate, endDate, status }) => {
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{formatDateToString(startDate)}</td>
                  <td>{formatDateToString(endDate)}</td>
                  <td>{status}</td>
                  <td className="table-flex-cell">
                    <button
                      type="button"
                      className="button button-green"
                      onClick={() => {
                        setProjectSelected({
                          id,
                          name,
                          description,
                          startDate,
                          endDate,
                          status,
                        });
                        setShowProjectForm(true);
                      }}
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
                  </td>
                  <td>
                    <button
                      type="button"
                      className="button"
                      onClick={() => navigate(`/project/${id}/members`)}
                    >
                      Ver membros
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <Toast message={message} onClose={() => showToast(null)} />
      {showProjectForm && (
        <ProjectForm onClose={setShowProjectForm} project={projectSelected} />
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
