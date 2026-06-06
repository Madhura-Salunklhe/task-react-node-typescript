import "../styles/header.css";

const Header = () => {
  return (
    <header className="dashboard-header">
      <div>
        <h2>Student Management Dashboard</h2>
        <p>Manage students securely</p>
      </div>

      <div className="profile">
        <div className="profile-circle">
          A
        </div>

        <div>
          <h4>Administrator</h4>
          <small>Logged In</small>
        </div>
      </div>
    </header>
  );
};

export default Header;