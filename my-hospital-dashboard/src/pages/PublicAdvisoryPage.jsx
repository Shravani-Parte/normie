import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_API_DATA } from '@/api/mockData';

const PublicAdvisoryPage = () => {
    const data = MOCK_API_DATA.publicAdvisory;
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-grey-900">[Your Hospital Name]</h1>
        <p className="text-grey-600 mt-1">Proactive Health Intelligence Unit</p>
      </header>

      <main className="bg-white rounded-lg shadow-lg p-6 md:p-10">
        <div className="bg-warning-100 border-l-4 border-warning-500 text-warning-800 p-4 rounded-md mb-8">
            <h2 className="font-bold text-2xl">{data.title}</h2>
            <p className="text-sm">Issued: {data.issued}. Valid for next 72-96 hours.</p>
        </div>

        <div className="space-y-8 text-grey-800">
            <section>
                <h3 className="font-bold text-xl mb-3 text-grey-900">What is the risk?</h3>
                <p>{data.risk}</p>
            </section>
             <section>
                <h3 className="font-bold text-xl mb-3 text-grey-900">How to Protect Yourself</h3>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    {data.preventativeMeasures.map(measure => <li key={measure}>{measure}</li>)}
                </ul>
            </section>
            <section>
                <h3 className="font-bold text-xl mb-3 text-grey-900">Symptoms to Watch For</h3>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    {data.symptoms.map(symptom => <li key={symptom}>{symptom}</li>)}
                </ul>
            </section>
             <section className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                <h3 className="font-bold text-xl text-primary-900">When to See a Doctor</h3>
                <p className="text-sm text-primary-700 mt-1 mb-4">If symptoms are persistent or severe, book a consultation. Tele-visits are recommended to avoid exposure.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.doctors.map(doctor => (
                        <div key={doctor.name} className="border border-grey-200 bg-white p-4 rounded-md flex flex-col justify-between">
                            <div>
                                <p className="font-semibold text-lg text-grey-900">{doctor.name}</p>
                                <p className="text-sm text-grey-600">{doctor.specialty}</p>
                            </div>
                            <button disabled={!doctor.available} className={`w-full mt-3 text-white text-sm font-bold py-2 px-4 rounded transition-colors ${doctor.available ? 'bg-primary-500 hover:bg-primary-600' : 'bg-grey-400 cursor-not-allowed'}`}>
                                {doctor.available ? 'Book Appointment' : 'Unavailable'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </main>

       <footer className="text-center mt-8 text-grey-500 text-sm">
          <Link to="/login" className="text-primary-600 hover:underline">Hospital Staff Login</Link>
      </footer>
    </div>
  );
};

export default PublicAdvisoryPage;

