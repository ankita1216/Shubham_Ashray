import React from 'react';
import { COLORS } from '../../constants/colors';

export function SectionLabel({ children, onDark = true }) {
  const color = COLORS.primary;
  return (
    <div className="sa-label" style={{ color }}>
      <span style={{ width: 24, height: 1, background: color, flexShrink: 0 }} />
      <span>{children}</span>
    </div>
  );
}
