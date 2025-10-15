import Card from '@/components/ui/Card';
import { MOCK_API_DATA } from '@/api/mockData';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusBadge = (ratio) => {
  if (ratio < 0.25) return { text: 'Critical', tone: 'critical' };
  if (ratio < 0.75) return { text: 'Deficit', tone: 'warning' };
  if (ratio < 1.1) return { text: 'Sufficient', tone: 'success' };
  return { text: 'Surplus', tone: 'accent' };
};

const InventoryPage = () => {
  const data = MOCK_API_DATA.inventoryDashboard;
  const deficitItems = data.checklist.filter((item) => item.stock < item.need);
  const stableItems = data.checklist.length - deficitItems.length;

  const doughnutData = {
    labels: ['Critical / Deficit', 'Stable'],
    datasets: [
      {
        label: 'Inventory Health',
        data: [deficitItems.length, stableItems],
        backgroundColor: ['#E63946', '#2A9D8F'],
        borderColor: ['#B22432', '#1E776C'],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 16,
          color: '#475569',
          font: { family: 'Inter', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#023E8A',
        borderColor: '#00B4D8',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Inventory & Supply Intelligence</p>
          <h1 className="dashboard-title">Inventory Management</h1>
          <p className="dashboard-subtitle">
            Surge scenario: <span className="dashboard-highlight">{data.surgeEvent}</span>
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="dashboard-btn dashboard-btn--ghost">Assign Task</button>
          <button className="dashboard-btn dashboard-btn--outline">Mark Delivered</button>
          <button className="dashboard-btn">Create Purchase Order</button>
        </div>
      </header>

      <section className="inventory-grid">
        <Card className="inventory-grid__table">
          <div className="management-section-header">
            <div>
              <p className="management-section-eyebrow">Live Inventory</p>
              <h2>Surge Readiness Checklist</h2>
            </div>
            <div className="management-tags">
              <span className="management-tag management-tag--accent">Updated just now</span>
            </div>
          </div>
          <div className="inventory-table">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Current Stock</th>
                  <th>Predicted Need</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.checklist.map((item) => {
                  const ratio = item.stock / item.need;
                  const info = statusBadge(ratio);
                  const deficit = Math.max(item.need - item.stock, 0);
                  return (
                    <tr key={item.item} className={`inventory-row inventory-row--${info.tone}`}>
                      <td>{item.item}</td>
                      <td>{item.stock} units</td>
                      <td>{item.need} units</td>
                      <td>
                        <span className={`resource-tag resource-tag--${info.tone}`}>
                          {info.text}
                          {deficit > 0 ? ` (−${deficit})` : ''}
                        </span>
                      </td>
                      <td>
                        {deficit > 0 ? (
                          <div className="inventory-row__actions">
                            <button className="dashboard-btn dashboard-btn--inline">Allocate Beds</button>
                            <button className="dashboard-btn dashboard-btn--outline">Generate PO</button>
                          </div>
                        ) : (
                          <span className="inventory-row__placeholder">Balanced</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="inventory-grid__insights">
          <Card variant="accent" className="inventory-recommendations">
            <div className="management-section-header">
              <div>
                <p className="management-section-eyebrow">Auto Recommendations</p>
                <h2>Supply Actions Suggested</h2>
              </div>
            </div>
            <ul className="recommendation-list">
              {deficitItems.map((item) => (
                <li key={item.item} className="recommendation-card">
                  <div className="recommendation-card__badge">Confidence 94%</div>
                  <div className="recommendation-card__content">
                    <h3>{item.item}</h3>
                    <p>
                      Reorder {item.need - item.stock} units immediately to match predicted load.
                    </p>
                  </div>
                  <div className="recommendation-card__actions">
                    <button className="dashboard-btn dashboard-btn--ghost">Schedule Delivery</button>
                    <button className="dashboard-btn dashboard-btn--inline">Approve</button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="inventory-analytics">
            <div className="management-section-header">
              <div>
                <p className="management-section-eyebrow">Supply Health</p>
                <h2>Critical vs Stable Items</h2>
              </div>
            </div>
            <div className="inventory-chart">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="inventory-chart__label">
                <span>{deficitItems.length}</span>
                <p>Items flagged</p>
              </div>
            </div>
          </Card>

          <Card className="inventory-alerts">
            <div className="management-section-header">
              <div>
                <p className="management-section-eyebrow">Realtime Alerts</p>
                <h2>Operational Checklist</h2>
              </div>
            </div>
            <ul className="alert-list">
              <li>
                <h3>Oxygen refill schedule</h3>
                <p>Confirm tanker arrival by 20:00. Allocate bay for rapid refill.</p>
                <button className="dashboard-btn dashboard-btn--inline">Assign Task</button>
              </li>
              <li>
                <h3>N95 distribution</h3>
                <p>Prioritize ICU and ER wings. Ensure ward supervisors acknowledge receipt.</p>
                <button className="dashboard-btn dashboard-btn--inline">Acknowledge</button>
              </li>
              <li>
                <h3>Isolation ward prep</h3>
                <p>Ready negative-pressure rooms and stock antiviral kits.</p>
                <button className="dashboard-btn dashboard-btn--inline">Mark Ready</button>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default InventoryPage;
