import Modal from '../Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { webformatURL, tags } = item;
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={onModal}
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
      />
      {showModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;
