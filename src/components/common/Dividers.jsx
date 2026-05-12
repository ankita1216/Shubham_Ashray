import React from 'react';

export function WaveDarkToLight({ fromColor, toColor }) {
  return (
    <div style={{ display: "block", width: "100%", overflow: "hidden", lineHeight: 0, background: fromColor, marginBottom: -2 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
        <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill={toColor} />
      </svg>
    </div>
  );
}

export function WaveLightToDark({ fromColor, toColor }) {
  return (
    <div style={{ display: "block", width: "100%", overflow: "hidden", lineHeight: 0, background: fromColor, marginBottom: -2 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
        <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill={toColor} />
      </svg>
    </div>
  );
}
