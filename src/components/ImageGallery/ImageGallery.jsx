import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="imageGallery">
      {images.map(image => (
        <li className="imageGalleryItem" key={image.id}>
          <ImageGalleryItem image={image} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webImgURL: PropTypes.string,
      lgImgURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
