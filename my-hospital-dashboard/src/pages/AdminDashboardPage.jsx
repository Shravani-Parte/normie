import React from 'react';
import Card from '@/components/ui/Card';
import { MOCK_API_DATA } from '@/api/mockData';
import { Bar } from 'react-chartjs-2'; // Import Bar chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Helper component for the gauge
const ReadinessGauge = ({ score }) => {
    const circumference = 2 * Math.PI * 52; // 2 * pi * radius
    const offset = circumference - (score / 100) * circumference;
    const color = score > 80 ? 'stroke-success-500' : score > 60 ? 'stroke-warning-500' : 'stroke-danger-500';

    return (
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
                <circle className="stroke-grey-200" strokeWidth="12" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80" />
                <circle className={`${color} transition-all duration-1000 ease-in-out`} strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80" />
            </svg>
            <span className={`absolute text-4xl font-bold ${color.replace('stroke-', 'text-')}`}>{score}%</span>
        </div>
    );
};

const AdminDashboardPage = () => {
    const data = MOCK_API_DATA.adminDashboard;

    // Chart.js data configuration
    const chartData = {
        labels: data.surgeForecast.map(d => d.day),
        datasets: [
            {
                label: 'Predicted Patients',
                data: data.surgeForecast.map(d => d.prediction),
                backgroundColor: data.surgeForecast.map(d => {
                    if (d.prediction >= 250) return '#EF4444'; // Danger
                    if (d.prediction >= 200) return '#F59E0B'; // Warning
                    return '#3B82F6'; // Primary Blue
                }),
                borderColor: data.surgeForecast.map(d => {
                    if (d.prediction >= 250) return '#B91C1C';
                    if (d.prediction >= 200) return '#92400E';
                    return '#2563EB';
                }),
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    // Chart.js options configuration
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Patient Admissions Forecast',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                color: '#1E293B', // grey-900
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.raw;
                        const cause = data.surgeForecast[context.dataIndex]?.cause;
                        return [label, `Cause: ${cause}`];
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#475569', // grey-600
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#E2E8F0', // grey-200
                },
                ticks: {
                    color: '#475569', // grey-600
                }
            },
        },
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-grey-900 mb-6">Administrator Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <h2 className="text-xl font-semibold text-grey-800 mb-4">Patient Surge Forecast (Next 7 Days)</h2>
                        <div className="h-80"> {/* Increased height for better chart visibility */}
                           <Bar data={chartData} options={chartOptions} />
                       </div>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-semibold text-grey-800 mb-4">Top Priority Recommendations</h2>
                        <ul className="space-y-4">
                            {data.actionItems.map((item, index) => (
                                <li key={index} className="p-4 bg-grey-50 rounded-lg border border-grey-200">
                                    <div className="flex items-start">
                                        <span className={`flex-shrink-0 px-2 py-1 text-xs font-bold rounded-full mr-4 mt-1
                                            ${item.priority === 'High' ? 'bg-danger-100 text-danger-500' : ''}
                                            ${item.priority === 'Medium' ? 'bg-warning-100 text-warning-500' : ''}
                                        `}>
                                            {item.priority.toUpperCase()}
                                        </span>
                                        <div>
                                            <p className="font-semibold text-grey-800">{item.action}</p>
                                            <p className="text-sm text-grey-600 mt-1">{item.reason}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Side Column */}
                <div className="space-y-6">
                    <Card>
                        <h2 className="text-xl font-semibold text-grey-800 mb-4 text-center">Overall Readiness</h2>
                        <div className="flex justify-center mb-4">
                            <ReadinessGauge score={data.readiness.score} />
                        </div>
                        <div className="space-y-2 text-grey-600">
                            <div className="flex justify-between items-center"><p>Staffing:</p><p className="font-bold text-grey-800">{data.readiness.staffing}%</p></div>
                            <div className="flex justify-between items-center"><p>Bed Availability:</p><p className="font-bold text-grey-800">{data.readiness.beds}%</p></div>
                            <div className="flex justify-between items-center"><p>Critical Supplies:</p><p className="font-bold text-grey-800">{data.readiness.supplies}%</p></div>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-semibold text-grey-800 mb-4">Live Hospital Status</h2>
                        <div className="space-y-4">
                           <div className="flex justify-between items-baseline"><p className="text-grey-600">ER Wait Time</p><p className="font-bold text-2xl text-warning-500">{data.liveStatus.erWaitTime}</p></div>
                           <div className="flex justify-between items-baseline"><p className="text-grey-600">ICU Occupancy</p><p className="font-bold text-2xl text-danger-500">{data.liveStatus.icuOccupancy}</p></div>
                           <div className="flex justify-between items-baseline"><p className="text-grey-600">Ventilators In Use</p><p className="font-bold text-2xl text-danger-500">{data.liveStatus.ventilatorsInUse}</p></div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;