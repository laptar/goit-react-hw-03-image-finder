import s from './ImageGalleryItem.module.css';

export const ImageGalleyItem = ({
  imageList: { previewURL, tags, largeImageURL },
}) => {
  return (
    <li className={s.galleryItem}>
      <img
        className={s.image}
        src={previewURL}
        alt={tags}
        data-source={largeImageURL}
      />
    </li>
  );
};
