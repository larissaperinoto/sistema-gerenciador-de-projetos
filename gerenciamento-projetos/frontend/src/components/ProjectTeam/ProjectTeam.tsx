import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsService, ProjectType } from "../../services/projects.service";
import { Toast } from "../Toast/Toast";
import { useToast } from "../../hooks/useToast";
import { UserType } from "../../services/auth.service";
import { ModalAlert } from "../ModalAlert/ModalAlert";
import { AddMember } from "../AddMember/AddMember";
import { formatDateToString } from "../../utils/format";
import "./ProjectTeam.css";

export function ProjectTeam() {
  const { message, showToast } = useToast();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectType>();
  const [members, setMembers] = useState<UserType[]>([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showRemoveUserAlert, setShowRemoveUserAlert] =
    useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<Partial<UserType>>();

  const { projectId } = useParams();

  async function handleRemoveUser(projectId: string, userId: string) {
    try {
      await ProjectsService.getInstance().removeMember(projectId, userId);
      setMembers((prev) => prev.filter(({ id }) => id !== userId));
      setShowRemoveUserAlert(false);
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

  useEffect(() => {
    async function requestData() {
      try {
        const projectInfo = await ProjectsService.getInstance().getProject(
          projectId!
        );

        setProject(projectInfo);
        const members = await ProjectsService.getInstance().getMembers(
          projectId!
        );
        setMembers(members);
      } catch (e) {
        console.log(e);
        if ((e as Error).message === "Unauthorized") {
          navigate("/");
        } else {
          showToast((e as Error).message, {
            duration: 3000,
          });
        }
      }
    }
    requestData();
  }, [showAddMemberModal]);

  return (
    <div className="project-container">
      <h1>{project?.name}</h1>
      <p className="project-description">{`${project?.description}`}</p>
      <div className="project-infos">
        <p className="project-info">{`Data de início: ${formatDateToString(
          project?.startDate
        )}`}</p>
        <p className="project-info">{`Data de finalização: ${formatDateToString(
          project?.endDate
        )}`}</p>
        <p className="project-info">{`Status: ${project?.status}`}</p>
        <button
          type="button"
          className="button button-top-right button-blue"
          onClick={() => setShowAddMemberModal(true)}
        >
          + Adicionar Membro
        </button>
      </div>

      <table className="project-members-table">
        <thead className="projects-members-table-header">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="projects-members-table-body">
          {members.map(({ id, name, email, role }) => {
            return (
              <tr key={id}>
                <th>{name}</th>
                <th>{email}</th>
                <th>{role}</th>

                <th>
                  <button type="button" className="button button-green">
                    Editar
                  </button>
                  <button
                    type="button"
                    className="button button-red"
                    onClick={() => {
                      setShowRemoveUserAlert(true);
                      setUserSelected({
                        id,
                        name,
                        email,
                        role,
                      });
                    }}
                  >
                    Excluir
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Toast message={message} onClose={() => showToast(null)} />
      {showRemoveUserAlert && (
        <ModalAlert
          text={`Tem certeza de que deseja prosseguir na remoção do usuário ${userSelected?.name}?`}
          onClose={setShowRemoveUserAlert}
          actionButton={
            <button
              type="button"
              className="button button-red"
              onClick={() => handleRemoveUser(projectId!, userSelected?.id!)}
            >
              Remover
            </button>
          }
        />
      )}
      {showAddMemberModal && (
        <AddMember onClose={setShowAddMemberModal} members={members} />
      )}
    </div>
  );
}
