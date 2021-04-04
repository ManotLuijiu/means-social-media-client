import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function DeleteButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
    }
  `;

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      // TODO: remove post from cache
    },
    variables: { postId },
  });

  return (
    <>
      <Button icon as="div" floated="right" color="red" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" />
      </Button>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
    </>
  );
}

DeleteButton.propTypes = {
  postId: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.array.isRequired,
    ]),
  ).isRequired,
};
