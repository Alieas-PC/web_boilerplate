import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ text, open, onClose, duration }) => {
  const [handle, setHandle] = useState(null);

  useEffect(() => {
    if (open) {
      clearTimeout(handle);

      setHandle(
        setTimeout(() => {
          onClose();
        }, duration)
      );
    }
  }, [open]);

  return (
    <div
      style={{
        display: open ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999
      }}
    >
      <div
        style={{
          position: 'fixed',
          padding: '8px 16px',
          transform: 'translate(-50%,-50%)',
          top: '50%',
          left: '50%',
          background: 'rgba(0,0,0,0.8)',
          color: 'rgba(255,255,255,0.8)',
          borderRadius: 4
        }}
      >
        {text}
      </div>
    </div>
  );
};

Toast.propTypes = {
  text: PropTypes.string,
  duration: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

Toast.defaultProps = {
  text: '',
  duration: 2000,
  open: false,
  onClose: () => {}
};

export default Toast;
