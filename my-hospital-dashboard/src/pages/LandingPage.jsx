import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero__content">
          <p className="landing-eyebrow">AI-Enabled Hospital Operations</p>
          <h1 className="landing-title">Welcome to the AI Hospital Readiness System</h1>
          <p className="landing-subtitle">
            Monitor capacity, empower clinical teams, and coordinate emergency readiness from a unified control center.
          </p>
          <div className="landing-cta-group">
            <Link to="/auth/login" className="landing-cta landing-cta--primary">
              Staff Login
            </Link>
            <Link to="/auth/register" className="landing-cta landing-cta--secondary">
              Request Access
            </Link>
          </div>
        </div>
        <div className="landing-hero__illustration">
          <div className="landing-stat-card">
            <span className="landing-stat-card__label">Live Bed Availability</span>
            <span className="landing-stat-card__value">92%</span>
            <span className="landing-stat-card__trend">+4% vs last hour</span>
          </div>
          <div className="landing-stat-card">
            <span className="landing-stat-card__label">Response Coordination</span>
            <span className="landing-stat-card__value">12 teams on standby</span>
            <span className="landing-stat-card__trend">Updated moments ago</span>
          </div>
        </div>
      </section>

      <section className="landing-highlight">
        <div className="landing-highlight__grid">
          <div className="landing-highlight__item">
            <h3>Unified Command Center</h3>
            <p>Gain real-time visibility into admissions, staffing, triage, and inventory across every department.</p>
          </div>
          <div className="landing-highlight__item">
            <h3>Predictive Insights</h3>
            <p>Leverage AI forecasts to anticipate surges, optimize resource allocation, and reduce patient wait time.</p>
          </div>
          <div className="landing-highlight__item">
            <h3>Coordinated ERT Response</h3>
            <p>Activate emergency protocols instantly with role-based automations for clinical and operations teams.</p>
          </div>
        </div>
      </section>

      <section className="landing-footer">
        <p>
          Looking to stay informed on public advisories? Visit our{' '}
          <Link to="/advisory" className="landing-link">
            readiness bulletin
          </Link>{' '}
          for the latest updates.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
