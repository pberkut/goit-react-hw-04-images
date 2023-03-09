import { useEffect, useState } from 'react';
import { fetchImagesWithQuery } from '../services/pixabay-API';
import { handleFetchData } from '../utils/handleFetchData';
import { Searchbar } from './Searchbar';
import { Loader } from './Loader';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error } from './Error';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetch = async () => {
      setStatus('pending');

      try {
        const data = await fetchImagesWithQuery(query, page);
        if (data.images.length === 0) {
          toast.info(`"${query}" not found images!`);
          setStatus('notFoundImage');
          return;
        }

        if (page === 1) {
          toast.info(`You find ${data.totalImages} images!`);
        }

        const handleImages = handleFetchData(data.images);
        setImages(prevImages => [...prevImages, ...handleImages]);

        setStatus('resolved');
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error);
        setStatus('rejected');
        toast.error(`Something went wrong`);
      }
    };

    fetch();
  }, [query, page]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalPages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const availablePages = totalPages > page;

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {status === 'pending' && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {availablePages && <Button onLoadMore={handleLoadMore} />}
      {status === 'rejected' && <Error error={error.message} />}
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};
