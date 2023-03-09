import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const { webImgURL, tags } = image;

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <img
        className="imageGalleryItem-image"
        src={webImgURL}
        alt={tags}
        onClick={() => toggleModal()}
      />
      {showModal && <Modal showImage={image} onClose={() => toggleModal()} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webImgURL: PropTypes.string,
    lgImgURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
