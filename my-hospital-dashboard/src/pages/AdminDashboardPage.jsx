import Card from '@/components/ui/Card';
import { MOCK_API_DATA } from '@/api/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const progressWidthClass = (value) => {
  if (value >= 100) return 'w-full';
  if (value >= 95) return 'w-[95%]';
  if (value >= 90) return 'w-[90%]';
  if (value >= 85) return 'w-[85%]';
  if (value >= 80) return 'w-[80%]';
  if (value >= 75) return 'w-[75%]';
  if (value >= 70) return 'w-[70%]';
  if (value >= 65) return 'w-[65%]';
  if (value >= 60) return 'w-[60%]';
  if (value >= 55) return 'w-[55%]';
  if (value >= 50) return 'w-[50%]';
  if (value >= 45) return 'w-[45%]';
  if (value >= 40) return 'w-[40%]';
  if (value >= 35) return 'w-[35%]';
  if (value >= 30) return 'w-[30%]';
  return 'w-[25%]';
};

const readinessColor = (value) => {
  if (value >= 85) return 'bg-success-500';
  if (value >= 65) return 'bg-warning-500';
  return 'bg-danger-500';
};

const ReadinessGauge = ({ score }) => {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  const color = score > 80 ? 'stroke-success-500' : score > 60 ? 'stroke-warning-500' : 'stroke-danger-500';

  return (
    <div className="relative inline-flex h-40 w-40 items-center justify-center overflow-hidden rounded-full">
      <svg className="h-full w-full -rotate-90 transform">
        <circle className="stroke-grey-200" strokeWidth="12" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80" />
        <circle
          className={`${color} transition-all duration-700 ease-out`}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="80"
          cy="80"
        />
      </svg>
      <span className={`dashboard-gauge__value ${color.replace('stroke-', 'text-')}`}>{score}%</span>
    </div>
  );
};

const AdminDashboardPage = () => {
  const data = MOCK_API_DATA.adminDashboard;

  const keyMetrics = [
    {
      label: 'Bed Occupancy',
      value: `${data.readiness.beds}%`,
      change: '+12% vs baseline',
      status: 'critical',
      badge: 'High Usage',
    },
    {
      label: 'Predicted Patient Load',
      value: `${data.surgeForecast[3].prediction}`,
      change: 'Saturday peak forecast',
      status: 'warning',
      badge: 'Forecast',
    },
    {
      label: 'Staff Readiness',
      value: `${data.readiness.staffing}%`,
      change: 'All units briefed',
      status: 'success',
      badge: 'Staffing',
    },
    {
      label: 'Machine Uptime',
      value: '94%',
      change: 'Ventilators operational',
      status: 'success',
      badge: 'Equipment',
    },
  ];

  const notifications = [
    {
      title: 'Respiratory surge in 36 hrs',
      description: 'ERT to confirm standby teams by 18:00 today.',
      tone: 'critical',
    },
    {
      title: 'Add 10 ventilators to ICU',
      description: 'Procurement flagged limited buffer stock.',
      tone: 'warning',
    },
    {
      title: 'Prepare isolation ward',
      description: 'Convert West Wing general ward immediately.',
      tone: 'accent',
    },
  ];

  const chartData = {
    labels: data.surgeForecast.map((point) => point.day),
    datasets: [
      {
        label: 'Predicted Patients',
        data: data.surgeForecast.map((point) => point.prediction),
        backgroundColor: data.surgeForecast.map((point) => {
          if (point.prediction >= 260) return '#E63946';
          if (point.prediction >= 220) return '#F4A261';
          return '#0077B6';
        }),
        borderColor: '#023E8A',
        borderWidth: 2,
        borderRadius: 12,
        barPercentage: 0.65,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '7-Day Patient Surge Forecast',
        font: {
          family: 'Inter',
          size: 16,
          weight: '600',
        },
        color: '#1E293B',
      },
      tooltip: {
        backgroundColor: '#023E8A',
        borderColor: '#00B4D8',
        borderWidth: 1,
        padding: 12,
        titleFont: { family: 'Inter', weight: '600' },
        bodyFont: { family: 'Inter' },
        callbacks: {
          afterBody(context) {
            const point = data.surgeForecast[context[0].dataIndex];
            return `Cause: ${point.cause}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#475569',
          font: {
            family: 'Inter',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#D7DEE9',
          drawBorder: false,
        },
        ticks: {
          color: '#475569',
          font: {
            family: 'Inter',
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Strategic Readiness Command Center</p>
          <h1 className="dashboard-title">Administrator Dashboard</h1>
        </div>
        <div className="dashboard-actions">
          <button className="dashboard-btn dashboard-btn--ghost">Assign Task</button>
          <button className="dashboard-btn dashboard-btn--outline">Approve Action</button>
          <button className="dashboard-btn">Export Report</button>
        </div>
      </header>

      <section className="surge-alert">
        <div className="surge-alert__icon">⚠</div>
        <div className="surge-alert__content">
          <h2>Respiratory surge expected in 36 hours</h2>
          <p>
            Coordinate staff standby, ensure emergency vents are serviced, and confirm oxygen delivery schedule.
          </p>
        </div>
        <div className="surge-alert__meta">
          <span className="surge-alert__tag">High Priority</span>
          <button className="dashboard-btn dashboard-btn--inline">Broadcast Alert</button>
        </div>
      </section>

      <section className="metric-grid">
        {keyMetrics.map((metric) => (
          <Card key={metric.label} variant={metric.status === 'critical' ? 'accent' : 'default'} className={`metric-card metric-card--${metric.status}`}>
            <div className="metric-card__badge">{metric.badge}</div>
            <div className="metric-card__value-row">
              <p className="metric-card__label">{metric.label}</p>
              <p className="metric-card__value">{metric.value}</p>
            </div>
            <p className="metric-card__change">{metric.change}</p>
          </Card>
        ))}
      </section>

      <section className="management-grid">
        <Card className="management-grid__forecast">
          <div className="management-section-header">
            <div>
              <p className="management-section-eyebrow">Surge Timeline</p>
              <h2>Forecast Overview</h2>
            </div>
            <div className="management-tags">
              <span className="management-tag management-tag--critical">Critical surge on Sat</span>
              <span className="management-tag">AI v5.3 model</span>
            </div>
          </div>
          <div className="forecast-chart">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="management-grid__actions">
          <div className="management-section-header">
            <div>
              <p className="management-section-eyebrow">AI Actions</p>
              <h2>Recommended Mobilization</h2>
            </div>
            <button className="dashboard-btn dashboard-btn--ghost">Mark as In Progress</button>
          </div>
          <ul className="action-list">
            {data.actionItems.map((item) => (
              <li key={item.action} className="action-card">
                <span className={`action-card__priority action-card__priority--${item.priority.toLowerCase()}`}>
                  {item.priority}
                </span>
                <div className="action-card__content">
                  <p className="action-card__title">{item.action}</p>
                  <p className="action-card__meta">{item.reason}</p>
                </div>
                <div className="action-card__cta-group">
                  <button className="dashboard-btn dashboard-btn--inline">Approve</button>
                  <button className="dashboard-btn dashboard-btn--ghost">Assign</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="management-grid__notifications">
          <div className="management-section-header">
            <div>
              <p className="management-section-eyebrow">Live Signals</p>
              <h2>Command Notifications</h2>
            </div>
          </div>
          <ul className="notification-list">
            {notifications.map((item) => (
              <li key={item.title} className={`notification-card notification-card--${item.tone}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="dashboard-btn dashboard-btn--inline">Acknowledge</button>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="readiness-grid">
        <Card className="readiness-card">
          <div className="management-section-header">
            <div>
              <p className="management-section-eyebrow">Unified Readiness Score</p>
              <h2>Hospital Capability Snapshot</h2>
            </div>
            <button className="dashboard-btn dashboard-btn--ghost">View Audit Log</button>
          </div>
          <div className="readiness-layout">
            <div className="readiness-gauge">
              <ReadinessGauge score={data.readiness.score} />
              <p className="readiness-gauge__caption">AI weighted readiness score</p>
            </div>
            <div className="readiness-progress">
              {[
                { label: 'Staffing Coverage', value: data.readiness.staffing },
                { label: 'Bed Availability', value: data.readiness.beds },
                { label: 'Critical Supplies', value: data.readiness.supplies },
              ].map((item) => (
                <div key={item.label} className="progress-row">
                  <div className="progress-row__label">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="progress-row__track">
                    <div className={`progress-row__meter ${readinessColor(item.value)} ${progressWidthClass(item.value)}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="resource-card">
          <div className="management-section-header">
            <div>
              <p className="management-section-eyebrow">Resource Allocation</p>
              <h2>Critical Resources Checklist</h2>
            </div>
            <div className="management-tags">
              <span className="management-tag">ICU focus</span>
              <span className="management-tag management-tag--accent">Live update</span>
            </div>
          </div>
          <div className="resource-table">
            <table>
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Allocated</th>
                  <th>Ready</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { unit: 'ICU Beds', allocated: '18 / 24', ready: 'Allocate 6 beds', tone: 'critical' },
                  { unit: 'Respiratory Staff', allocated: '42 / 58', ready: 'Assign 8 float nurses', tone: 'warning' },
                  { unit: 'Ventilator Pool', allocated: '28 / 34', ready: 'Service 4 units', tone: 'accent' },
                ].map((row) => (
                  <tr key={row.unit}>
                    <td>{row.unit}</td>
                    <td>{row.allocated}</td>
                    <td>
                      <span className={`resource-tag resource-tag--${row.tone}`}>{row.ready}</span>
                    </td>
                    <td>
                      <button className="dashboard-btn dashboard-btn--outline">Allocate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
