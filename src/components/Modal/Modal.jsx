import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ showImage, onClose }) => {
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <button
          type="button"
          className="button"
          onClick={() => {
            onClose();
          }}
        >
          X
        </button>
        <img src={showImage.lgImgURL} alt={showImage.tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  showImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    lgImgURL: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
