import React from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MOCK_API_DATA } from '@/api/mockData';

const ERTPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const data = MOCK_API_DATA.ertDashboard;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusClass = (status) => {
    switch(status) {
        case 'On-Site': return 'bg-success-500';
        case 'En Route (ETA 12m)': return 'bg-primary-500';
        case 'Acknowledged': return 'bg-warning-500';
        default: return 'bg-grey-600';
    }
  }

  return (
    <div className="min-h-screen bg-grey-900 text-white p-4 md:p-8 flex flex-col items-center font-sans">
        <div className="w-full max-w-5xl">
            <header className="bg-danger-500 text-center py-4 rounded-lg shadow-2xl mb-8 flex justify-between items-center px-6">
                <div></div> {/* Spacer */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-wider animate-pulse">🔴 ALERT LEVEL: RED 🔴</h1>
                  <p className="text-red-100 uppercase">ERT Console</p>
                </div>
                <button 
                    onClick={handleLogout} 
                    className="bg-danger-700 hover:bg-danger-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm"
                >
                    Logout
                </button>
            </header>
            
            <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-grey-800 p-6 rounded-lg shadow-lg">
                    <h2 className="font-bold text-2xl text-danger-300 border-b border-danger-400/50 pb-3 mb-4">Situation Briefing</h2>
                    <div className="space-y-3 text-grey-200">
                        <p><strong>Event Type:</strong><br/> <span className="text-lg">{data.eventType}</span></p>
                        <p><strong>Predicted Peak:</strong><br/> <span className="text-lg">{data.peakTime}</span></p>
                        <p><strong>Predicted Influx:</strong><br/> <span className="text-lg">{data.predictedInflux}</span></p>
                        <div>
                            <p><strong>Primary Needs:</strong></p>
                            <ul className="list-disc list-inside ml-4 text-danger-200 text-lg">
                                {data.primaryNeeds.map(n => <li key={n}>{n}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="bg-grey-800 p-6 rounded-lg shadow-lg">
                    <h2 className="font-bold text-2xl text-primary-300 border-b border-primary-400/50 pb-3 mb-4">Team Activation Status</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-grey-600">
                                <th className="py-2">Member</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                             {data.team.map(t => (
                                <tr key={t.name} className="border-b border-grey-700">
                                    <td className="py-3">
                                        <p className="font-semibold text-lg">{t.name}</p>
                                        <p className="text-sm text-grey-400">{t.role}</p>
                                    </td>
                                    <td className="py-3">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClass(t.status)}`}>{t.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>

            <footer className="mt-10 text-center">
                 <button className="bg-success-500 hover:bg-success-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-2xl">
                    Acknowledge Alert & Confirm Mobilization
                </button>
            </footer>
        </div>
    </div>
  );
};

export default ERTPage;

