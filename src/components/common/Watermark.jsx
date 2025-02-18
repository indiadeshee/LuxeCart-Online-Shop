import React from 'react';

const Watermark = () => {
  const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    opacity: '0.1',
    fontSize: '14px',
    fontFamily: 'monospace',
    userSelect: 'none',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'rotate(-45deg)',
  };

  return (
    <div style={style}>
      © {new Date().getFullYear()} desheekart
      <br />
      Developed by Raviranjan Kumar
    </div>
  );
};

export default Watermark;
