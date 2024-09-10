import { useState } from "react";
import { UserRole, UserType } from "../../services/auth.service";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Toast/Toast";
import { UsersService } from "../../services/users.service";

interface IEditMember {
  member: UserType;
  onClose: (status: boolean) => void;
}

export function EditMember({ member, onClose }: IEditMember) {
  const { message, showToast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType>(member);
  const [role, setRole] = useState<UserRole>();

  async function handleEditUser(userId: string, role: string) {
    try {
      await UsersService.getInstance().changeRole(userId, role);
      onClose(false);
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
          <input type="text" disabled className="input" value={user.name} />
          <input type="text" disabled className="input" value={user.email} />
          <select
            onChange={(e) => setRole(e.target.value as UserRole)}
            value={role}
            className="input"
            defaultValue={member.role}
          >
            <option value={UserRole.GERENTE}>{UserRole.GERENTE}</option>
            <option value={UserRole.DESENVOLVEDOR}>
              {UserRole.DESENVOLVEDOR}
            </option>
            <option value={UserRole.DESIGNER}>{UserRole.DESIGNER}</option>
          </select>
        </form>
        <button
          type="button"
          className="button button-green width-total"
          onClick={() => handleEditUser(member.id!, role!)}
        >
          Editar
        </button>
      </div>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
