import React from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function MyPopup({ content, trigger }) {
  return <Popup inverted content={content} trigger={trigger} />;
}

MyPopup.propTypes = {
  content: PropTypes.string.isRequired,
  trigger: PropTypes.node.isRequired,
};
