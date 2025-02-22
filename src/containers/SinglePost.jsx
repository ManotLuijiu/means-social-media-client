import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { Form, Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import 'moment/locale/th';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../utils/myPopup';

moment().locale('th');

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const { postId } = props.match.params; // eslint-disable-line
  console.log('postId', postId);

  const commentInputRef = useRef(null);

  const [commented, setComment] = useState('');

  const history = useHistory();

  SinglePost.defaultProps = {
    postId: null,
  };

  const SUBMIT_COMMENT_MUTATION = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
      createComment(postId: $postId, body: $body) {
        id
        comments {
          id
          body
          createdAt
          username
        }
        commentCount
      }
    }
  `;

  const FETCH_POST_QUERY = gql`
    query GetPost($postId: ID!) {
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

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: { postId, body: commented },
  });

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  console.log('singlePostData', data);

  function deletePostCallback() {
    history.push('/');
  }

  // const { getPost } = data;
  // console.log('getPost', getPost);

  // const { id, body, createdAt, username, likes, likeCount, commentCount } = data.getPost;

  // let postMarkup;

  if (loading) return <p>Loading post...</p>;
  const { id, body, createdAt, username, likes, comments, likeCount, commentCount } = data.getPost;

  return (
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
              <MyPopup
                content="Comment on post"
                trigger={
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('comment on post')}>
                    <Button basic color="blue">
                      <Icon name="comment" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                }
              />

              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment..."
                      name="comment"
                      value={commented}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={commented.trim() === ''}
                      onClick={submitComment}>
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

SinglePost.propTypes = {
  postId: PropTypes.string,
};
