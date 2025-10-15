import React, { useState } from 'react';
import Card from '@/components/ui/Card'; // Corrected Path
import { MOCK_API_DATA } from '@/api/mockData';

const DoctorDashboardPage = () => {
    const data = MOCK_API_DATA.doctorDashboard;
    const [isConfirmed, setIsConfirmed] = useState(false);

    return (
        <div>
            <header className="bg-primary-700 text-white rounded-lg p-6 mb-6 shadow-lg">
                <h1 className="text-2xl font-bold">Your Shift at a Glance</h1>
                <p className="opacity-90 mt-1">
                    Department: <strong>{data.department}</strong> | Starts: <strong>{data.startTime}</strong> | Expected Surge: 
                    <strong className="text-yellow-300"> {data.surgeIncrease}</strong>
                </p>
            </header>

            {!isConfirmed && (
                 <Card className="mb-6 border-l-4 border-primary-500">
                    <h2 className="font-bold text-lg text-grey-800 mb-2">Action Required: Availability Check</h2>
                    <p className="text-grey-600 mb-4">To ensure accurate staffing for the predicted surge, please confirm your availability for this shift.</p>
                    <div className="flex space-x-4">
                        <button onClick={() => setIsConfirmed(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">✅ Yes, I Confirm</button>
                    </div>
                </Card>
            )}
            {isConfirmed && (
                <div className="mb-6 bg-success-100 text-success-700 p-4 rounded-lg font-semibold">
                    Thank you for confirming. Your availability has been noted.
                </div>
            )}
           
            <main className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <section className="lg:col-span-3 space-y-6">
                    <Card>
                        <h2 className="font-bold text-xl text-grey-800 mb-4">Key Clinical Alerts</h2>
                        <ul className="space-y-4">
                            {data.alerts.map((alert, i) => (
                                <li key={i} className="flex items-start p-4 bg-warning-100 border-l-4 border-warning-500 rounded">
                                    <span className="text-3xl mr-4">{alert.icon}</span>
                                    <div>
                                        <p className="font-semibold text-yellow-800">{alert.title}</p>
                                        <p className="text-grey-700">{alert.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </section>
                <aside className="lg:col-span-2">
                    <Card>
                        <h2 className="font-bold text-xl text-grey-800 mb-4">Anticipated Case Mix</h2>
                        <div className="space-y-4">
                            {data.caseMix.map(c => (
                                <div key={c.name}>
                                    <div className="flex justify-between text-sm font-medium text-grey-600 mb-1">
                                        <span>{c.name}</span>
                                        <span>{c.value}%</span>
                                    </div>
                                    <div className="w-full bg-grey-200 rounded-full h-4">
                                        <div className="bg-primary-500 h-4 rounded-full" style={{ width: `${c.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </aside>
            </main>
        </div>
    );
};

export default DoctorDashboardPage;

