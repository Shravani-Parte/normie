import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="auth-screen">
      <div className="auth-screen__overlay" aria-hidden="true" />
      <div className="auth-screen__content">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
