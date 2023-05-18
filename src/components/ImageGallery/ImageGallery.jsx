import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ hits, showModal }) => {
  return (
    <ul className="ImageGallery">
      {hits.map(image => (
        <ImageGalleryItem key={image.id} image={image} showModal={showModal} />
        
      ))}
    </ul>
  );
};
