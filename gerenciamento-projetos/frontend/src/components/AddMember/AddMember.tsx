import { useEffect, useState } from "react";
import { UserType } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { useToast } from "../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../Toast/Toast";
import { ProjectsService } from "../../services/projects.service";
import "./AddMember.css";

interface AddMemberProps {
  onClose: (status: boolean) => void;
  members: UserType[];
}

export function AddMember({ onClose }: AddMemberProps) {
  const { message, showToast } = useToast();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [email, setEmail] = useState<string>();
  const [users, setUsers] = useState<UserType[]>([]);

  async function handleAddProjectMember(projectId: string, userId: string) {
    try {
      await ProjectsService.getInstance().addMember(projectId, userId);
      setUsers((prev) => prev.filter(({ id }) => id !== userId));
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

  useEffect(() => {
    async function requestUsers() {
      try {
        const userList = await UsersService.getInstance().getUsers();
        console.log(userList);
        setUsers(userList);
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
    requestUsers();
  }, []);

  async function handleFindUser() {}

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

        <form>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite um e-mail"
          />
        </form>
        <table>
          <tbody>
            {users.map(({ id, name, email, role }) => {
              return (
                <tr key={id}>
                  <th>{name}</th>
                  <th>{email}</th>
                  <th>{role}</th>
                  <th>
                    <button
                      type="button"
                      className="button button-blue"
                      onClick={() => handleAddProjectMember(projectId!, id!)}
                    >
                      + Adicionar
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
