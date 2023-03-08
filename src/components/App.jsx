import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar';
import { fetchImagesWithQuery, handleFetchData } from '../services/pixabay-API';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error } from './Error';

export const App = () => {
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetch1();
  }, [query]);

  useEffect(() => {
    fetch2();
  }, [page]);

  // const fetch3 = async () => {};

  const fetch1 = async () => {
    // const { query, page } = this.state;

    // this.setState({ status: 'pending', page: 1 });
    setStatus('pending');
    setPage(1);
    try {
      const data = await fetchImagesWithQuery(query, 1);

      if (data.images.length === 0) {
        toast.info(`"${query}" not found!`);

        setImages([]);
        setStatus('notFoundImage');
        setTotalPages(0);
        // return this.setState({
        //   images: [],
        //   status: 'notFoundImage',
        //   totalPages: 0,
        // });
      }

      const handleImages = handleFetchData(data.images);
      setImages(handleImages);
      setStatus('resolved');
      setTotalPages(data.totalPages);
      // this.setState({
      //   images: handleImages,
      //   status: 'resolved',
      //   totalPages: data.totalPages,
      // });
    } catch (error) {
      setError(error);
      setStatus('rejected');
      // this.setState({ error, status: 'rejected' });
      toast.error(`Something went wrong`);
    }
  };

  const fetch2 = async () => {
    setStatus('pending');
    // this.setState({ status: 'pending' });
    try {
      const data = await fetchImagesWithQuery(query, page);
      const handleImages = handleFetchData(data.images);

      setImages(prevState => [...prevState, ...handleImages]);
      setStatus('resolved');
      setTotalPages(data.totalPages);
      // this.setState(({ images }) => ({
      //   images: [...images, ...handleImages],
      //   status: 'resolved',
      //   totalPages: data.totalPages,
      // }));
    } catch (error) {
      setError(error);
      setStatus('rejected');
      // this.setState({ error, status: 'rejected' });
      toast.error(`$Something went wrong`);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    // this.setState({ query });
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);

    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
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

// export class App extends Component {
//   state = {
//     query: '',
//     totalPages: 0,
//     page: 1,
//     images: [],
//     error: false,
//     status: 'idle',
//   };

// async componentDidUpdate(_, prevState) {
//   const { query, page } = this.state;

//   if (prevState.query !== query) {
//     this.setState({ status: 'pending', page: 1 });
//     try {
//       const data = await fetchImagesWithQuery(query, 1);

//       if (data.images.length === 0) {
//         toast.info(`"${query}" not found!`);

//         return this.setState({
//           images: [],
//           status: 'notFoundImage',
//           totalPages: 0,
//         });
//       }

//       const handleImages = handleFetchData(data.images);
//       this.setState({
//         images: handleImages,
//         status: 'resolved',
//         totalPages: data.totalPages,
//       });
//     } catch (error) {
//       this.setState({ error, status: 'rejected' });
//       toast.error(`Something went wrong`);
//     }
//   }

//   if (prevState.page !== page && page !== 1) {
//     this.setState({ status: 'pending' });
//     try {
//       const data = await fetchImagesWithQuery(query, page);
//       const handleImages = handleFetchData(data.images);
//       this.setState(({ images }) => ({
//         images: [...images, ...handleImages],
//         status: 'resolved',
//         totalPages: data.totalPages,
//       }));
//     } catch (error) {
//       this.setState({ error, status: 'rejected' });
//       toast.error(`$Something went wrong`);
//     }
//   }
// }

// handleSubmit = query => {
//   this.setState({ query });
// };

// handleLoadMore = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

//   render() {
//     const { images, status, page, totalPages, error } = this.state;
//     const availablePages = totalPages > page;

// return (
//   <div>
//     <Searchbar onSubmit={this.handleSubmit} />
//     {status === 'pending' && <Loader />}
//     {images.length > 0 && <ImageGallery images={images} />}
//     {availablePages && <Button onLoadMore={this.handleLoadMore} />}
//     {status === 'rejected' && <Error error={error.message} />}
//     <ToastContainer position="top-right" autoClose={1500} />
//   </div>
// );
//   }
// }
