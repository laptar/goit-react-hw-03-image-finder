import s from './ImageGallery.module.css';
export const ImageGallery = props => {
  return (
    <ul className={s.gallery} onClick={props.onClic}>
      {props.children}
    </ul>
  );
};