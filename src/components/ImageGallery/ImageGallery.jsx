import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
export const ImageGallery = props => {
  return (
    <ul className={s.gallery} onClick={props.onClic}>
      {props.children}
    </ul>
  );
};

ImageGallery.protoTypes = {
  onClic: PropTypes.func,
  children: PropTypes.node,
};
