import PropTypes from 'prop-types';
// import { useEffect, useRef } from 'react';

export const Button = ({ onLoadMore }) => {
  // const buttonRef = useRef();

  // useEffect(() => {
  //   // const { top } = buttonRef.current.getBoundingClientRect();
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // });

  return (
    <button
      // ref={buttonRef}
      className="button"
      type="button"
      onClick={() => onLoadMore()}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
