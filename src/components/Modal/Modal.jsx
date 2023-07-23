import { useState, useEffect } from 'react';
import css from '../styles.module.css';
import PropTypes from 'prop-types';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, []);

  const onEscClick = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
