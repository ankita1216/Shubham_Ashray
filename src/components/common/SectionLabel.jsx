import React from 'react';
import { COLORS } from '../../constants/colors';

export function SectionLabel({ children, onDark = true }) {
  const color = COLORS.pink;
  return (
    <div className="flex items-center gap-3 mb-5" style={{ color, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
      <span style={{ width: 24, height: 1, background: color, flexShrink: 0 }} />
      <span style={{ color }}>{children}</span>
    </div>
  );
}
