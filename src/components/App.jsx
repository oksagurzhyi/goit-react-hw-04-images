import { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import { fetchImagies } from 'services/fetchApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchImagies(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          setShowBtn(false);
          alert(`There are no images by ${query}`);
          return;
        }
        setImages(prevState => [...prevState, ...data.hits]);
        setShowBtn(page < Math.ceil(data.totalHits / 12));
      })
      .catch(() => setIsLoading(false))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const onSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setShowBtn(false);
  };

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };
  const onClickBtnMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div
      style={{
        maxWidth: '1170',
        margin: '0, auto',
        padding: '20',
      }}
    >
      {isLoading && <Loader />}

      <SearchBar onSubmitForm={onSubmit} />

      <ImageGallery data={images} openModal={openModal} />

      {showBtn && <Button onClickBtnMore={onClickBtnMore} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt=""></img>
        </Modal>
      )}
    </div>
  );
}
