import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className="public-shell">
      <div className="public-shell__content">
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;
