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

export function AddMember({ onClose, members }: AddMemberProps) {
  const { message, showToast } = useToast();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [email, setEmail] = useState<string>();
  const [users, setUsers] = useState<UserType[]>([]);
  const [filtered, setFiltered] = useState<UserType[]>([]);

  async function handleAddProjectMember(projectId: string, userId: string) {
    try {
      await ProjectsService.getInstance().addMember(projectId, userId);
      setUsers((prev) => prev.filter(({ id }) => id !== userId));
    } catch (e) {
      showToast((e as Error).message, {
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    async function requestUsers() {
      try {
        const response = await UsersService.getInstance().getUsers();

        const userList = response.filter(({ id: userId }: UserType) => {
          const isMember = members.find(({ id }) => id === userId);

          if (isMember) {
            return false;
          }

          return true;
        });

        setUsers(userList);
      } catch (e) {
        showToast((e as Error).message, {
          duration: 3000,
        });
      }
    }
    requestUsers();
  }, []);

  useEffect(() => {
    if (email?.length) {
      const list = users.filter(({ email: userEmail }) =>
        userEmail.includes(email)
      );
      setFiltered(list);
    } else {
      setFiltered([]);
    }
  }, [email]);

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
            {(filtered.length ? filtered : users).map(
              ({ id, name, email, role }) => {
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td>
                      <button
                        type="button"
                        className="button"
                        onClick={() => handleAddProjectMember(projectId!, id!)}
                      >
                        + Adicionar
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
