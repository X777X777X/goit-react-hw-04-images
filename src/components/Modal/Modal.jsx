import './Modal.css';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', e => keyDown(e));

    return () => {
      window.removeEventListener('keydown', e => keyDown(e));
    };
  }, [onClose]);

  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { largeImageURL } = image;
  return createPortal(
    <div onClick={onOverlayClose} className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    ModalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;
