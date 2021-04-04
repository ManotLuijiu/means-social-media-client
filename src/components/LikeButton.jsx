/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Icon, Label } from 'semantic-ui-react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import MyPopup from '../utils/myPopup';

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  console.log('id', id);
  console.log('likes', likes);
  console.log('likeCount', likeCount);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
      likePost(postId: $postId) {
        id
        likes {
          id
          username
        }
        likeCount
      }
    }
  `;

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
    </Button>
  );

  // const likeButton = () => {
  //   if (user) {
  //     if (liked) {
  //       return (
  //         <Button color="red">
  //           <Icon name="heart" />
  //         </Button>
  //       );
  //     }
  //     return (
  //       <Button color="red" basic>
  //         <Icon name="heart" />
  //       </Button>
  //     );
  //   }
  //   return (
  //     <Button as={Link} to="/login" color="red" basic>
  //       <Icon name="heart" />
  //     </Button>
  //   );
  // };

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? 'Unlike' : 'Like'} trigger={likeButton} />
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

LikeButton.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.array.isRequired,
    ]),
  ).isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.array.isRequired,
    ]),
  ).isRequired,
};
