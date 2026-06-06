import {
  FaHome,
  FaUserGraduate,
  FaUserPlus,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  onDeleteAccount: () => void;
  onLogout: () => void;
}

const Sidebar = ({
  onDeleteAccount,
  onLogout,
}: SidebarProps) => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Student CMS</h2>

      <ul className="sidebar-menu">
        <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "link active" : "link"
  }
>
  <FaHome />
  <span>Dashboard</span>
</NavLink>

       <NavLink
  to="/students"
  className={({ isActive }) =>
    isActive ? "link active" : "link"
  }
>
  <FaUserGraduate />
  <span>Students</span>
</NavLink>

<NavLink
  to="/add-student"
  className={({ isActive }) =>
    isActive ? "link active" : "link"
  }
>
  <FaUserPlus />
  <span>Add Student</span>
</NavLink>
      </ul>

      <div className="sidebar-bottom">
        <button
          className="delete-account-btn"
          onClick={onDeleteAccount}
        >
          <FaTrash />
          Delete Account
        </button>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;