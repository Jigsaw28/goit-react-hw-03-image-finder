export const ImageGalleryItem = ({ image, showModal }) => {
  const {webformatURL, id, tags, largeImageURL } = image
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={() => showModal(largeImageURL)}
      />
    </li>
  );
};
