const handleFetchData = images => {
  return images.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webImgURL: webformatURL, lgImgURL: largeImageURL };
  });
};

export { handleFetchData };
