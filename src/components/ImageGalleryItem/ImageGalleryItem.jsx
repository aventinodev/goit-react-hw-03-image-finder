import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, dataSource, onClick }) => {
  return (
    <li className={css.galleryItem}>
      <img
        src={src}
        alt={alt}
        data-source={dataSource}
        className={css.image}
        onClick={event => onClick(event.target.dataset.source)}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  dataSource: PropTypes.string.isRequired,
};
