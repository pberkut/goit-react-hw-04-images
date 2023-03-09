import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '32766360-76e7eba189222bd8a15da9e43';
const PER_PAGE = 12;

const fetchImagesWithQuery = async (searchQuery, page = 1) => {
  const axiosParams = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  const response = await axios.get(BASE_URL, {
    params: axiosParams,
  });
  const availablePages = Math.ceil(response.data.totalHits / PER_PAGE);

  return {
    images: response.data.hits,
    totalImages: response.data.total,
    totalPages: availablePages,
  };
};

export { fetchImagesWithQuery };
