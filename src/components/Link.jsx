import React from 'react';
import PropTypes from 'prop-types';

export default function Link({ link }) {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
}

Link.propTypes = {
  link: PropTypes.objectOf([PropTypes.string.isRequired]).isRequired,
};
