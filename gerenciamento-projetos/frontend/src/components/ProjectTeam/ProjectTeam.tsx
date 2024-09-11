import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsService, ProjectType } from "../../services/projects.service";
import { Toast } from "../Toast/Toast";
import { useToast } from "../../hooks/useToast";
import { UserType } from "../../services/auth.service";
import { ModalAlert } from "../ModalAlert/ModalAlert";
import { AddMember } from "../AddMember/AddMember";
import { formatDateToString } from "../../utils/format";
import { EditMember } from "../EditMember/EditMember";
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
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);

  const { projectId } = useParams();

  async function handleRemoveUser(projectId: string, userId: string) {
    try {
      await ProjectsService.getInstance().removeMember(projectId, userId);
      setMembers((prev) => prev.filter(({ id }) => id !== userId));
      setShowRemoveUserAlert(false);
    } catch (e) {
      showToast((e as Error).message, {
        duration: 6000,
      });
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
        showToast((e as Error).message, {
          duration: 3000,
        });
      }
    }
    requestData();
  }, [showAddMemberModal, showEditUserModal]);

  return (
    <div className="container">
      <div className="container-flex">
        <div className="project-info-container">
          <button
            type="button"
            className="button-inline"
            onClick={() => navigate("/dashboard")}
          >
            {`<- Projetos`}
          </button>
          <h1 className="title-h1">{project?.name}</h1>
          <p>{`${project?.description}`}</p>

          <p>
            <strong>Data de início: </strong>
            {formatDateToString(project?.startDate)}
          </p>
          <p>
            <strong>Data de finalização: </strong>
            {formatDateToString(project?.endDate)}
          </p>
          <p>
            <strong>Status: </strong>
            {project?.status}
          </p>
        </div>
        <button
          type="button"
          className="button button-blue add-member-button"
          onClick={() => setShowAddMemberModal(true)}
        >
          + Adicionar Membro
        </button>
      </div>

      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {members.map(({ id, name, email, role }) => {
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>

                <td className="table-flex-cell">
                  <button
                    type="button"
                    className="button button-green"
                    onClick={() => {
                      setShowEditUserModal(true);
                      setUserSelected({ id, name, email, role });
                    }}
                  >
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
                </td>
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
      {showEditUserModal && (
        <EditMember
          member={userSelected as UserType}
          onClose={setShowEditUserModal}
        />
      )}
    </div>
  );
}
