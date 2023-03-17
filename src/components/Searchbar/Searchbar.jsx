import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import searchIcon from '../../image/search.svg';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = values => {
    const { search } = values;
    const handleSearch = search.toLowerCase().trim();
    if (handleSearch === '') {
      return toast.warn('Enter query!');
    }
    onSubmit(handleSearch);
  };

  return (
    <header className="searchbar">
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form className="searchForm">
          <button
            type="submit"
            className="searchForm-button"
            style={{ backgroundImage: `url(${searchIcon})` }}
            aria-label="search"
          ></button>

          <Field
            className="searchForm-input"
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
