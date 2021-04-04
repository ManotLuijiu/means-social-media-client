import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import FETCH_POSTS_QUERY from '../utils/graphql';

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  DeleteButton.defaultProps = {
    callback: null,
    commentId: null,
  };

  const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
    }
  `;

  const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
      deleteComment(postId: $postId, commentId: $commentId) {
        id
        comments {
          id
          username
          createdAt
          body
        }
        commentCount
      }
    }
  `;

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        // const resultData = result.data.createPost;
        const newData = data.getPosts.filter((p) => p.id !== postId);
        // newData = [resultData, ...newData];
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Button icon as="div" floated="right" color="red" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

DeleteButton.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string,
  callback: PropTypes.func,
};
