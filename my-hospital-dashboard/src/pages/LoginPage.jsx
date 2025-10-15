import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/utils/constants';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/app/admin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = await login({ email, password });

      switch (user.role) {
        case ROLES.ADMIN:
          navigate('/app/admin');
          break;
        case ROLES.DOCTOR:
          navigate('/app/doctor');
          break;
        case ROLES.INVENTORY:
          navigate('/app/inventory');
          break;
        case ROLES.ERT:
          navigate('/ert-console');
          break;
        default:
          navigate(from, { replace: true });
      }
    } catch (loginError) {
      setError(loginError.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-panel">
      <header className="auth-panel__header">
        <p className="auth-panel__eyebrow">Secure Access</p>
        <h1 className="auth-panel__title">Staff Portal Login</h1>
        <p className="auth-panel__subtitle">
          Sign in with your hospital email to continue. Use role-specific prefixes such as admin@ or doctor@ for demo access.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="e.g., admin@hospital.com"
            className="auth-form__input"
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="auth-form__input"
            required
          />
        </div>

        {error && <div className="auth-form__error">{error}</div>}

        <button type="submit" className="auth-form__submit">
          Sign In
        </button>
      </form>

      <footer className="auth-panel__footer">
        <Link to="/" className="auth-panel__link">
          &larr; Back to Landing Page
        </Link>
      </footer>
    </div>
  );
};

export default LoginPage;
