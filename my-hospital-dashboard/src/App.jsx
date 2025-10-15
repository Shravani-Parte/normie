import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-grey-50 text-grey-900">
      <Outlet />
    </div>
  );
};

export default App;
