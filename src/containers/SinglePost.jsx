import React, { useContext } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/th';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';

moment().locale('th');

export default function SinglePost(props) {
  const { postId } = props.match.params; // eslint-disable-line
  const { user } = useContext(AuthContext);
  console.log(postId);

  const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
      getPost(postId: $postId) {
        id
        body
        createdAt
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
  `;

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  let postMarkup;

  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              floated="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('comment on post')}>
                  <Button basic color="primary">
                    <Icon name="comment" />
                  </Button>
                  <Label basic color="primary" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <div>
      <h1>SinglePost</h1>
    </div>
  );
}

SinglePost.propTypes = {
  postId: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.array.isRequired,
    ]),
  ).isRequired,
};
