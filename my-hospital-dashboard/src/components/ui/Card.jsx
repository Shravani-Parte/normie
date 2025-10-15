import React from 'react';

const Card = ({ children, className = '', variant = 'default' }) => {
  const variantClass = variant === 'accent' ? 'dashboard-card--accent' : '';

  return <div className={`dashboard-card ${variantClass} ${className}`.trim()}>{children}</div>;
};

export default Card;
