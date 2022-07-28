import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleyItem = ({
  imageList: { webformatURL, tags, largeImageURL },
}) => {
  return (
    <li className={s.galleryItem}>
      <img
        className={s.image}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
      />
    </li>
  );
};

ImageGalleyItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
