import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="auth-panel">
      <header className="auth-panel__header">
        <p className="auth-panel__eyebrow">Access Request</p>
        <h1 className="auth-panel__title">Registration</h1>
        <p className="auth-panel__subtitle">
          The registration portal is currently limited to hospital administrators. Submit a ticket to onboard new staff members.
        </p>
      </header>
      <div className="auth-panel__body">
        <ul className="auth-panel__list">
          <li>Provision secure accounts for clinical and operational teams.</li>
          <li>Enforce role-based controls across admin, doctor, inventory, and ERT units.</li>
          <li>Track activation status and audit activity in real time.</li>
        </ul>
      </div>
      <footer className="auth-panel__footer">
        <Link to="/auth/login" className="auth-panel__cta">
          Return to Login
        </Link>
      </footer>
    </div>
  );
};

export default RegisterPage;
