export const ImageGalleryItem = ({ image }) => {
  return (
    <li className="ImageGalleryItem" key={image.id}>
      <img className="ImageGalleryItem-image" src={image.webformatURL} alt={image.tags} />
    </li>
  );
};
