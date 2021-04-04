import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Form, Image, Card, Button, Label, Icon, Transition } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/th';
import PropTypes from 'prop-types';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/myPopup';

import useForm from '../utils/hooks';
import FETCH_POSTS_QUERY from '../utils/graphql';

moment().locale('th');

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

export default function PostForm({ data: { getPosts: posts } }) {
  console.log('data', posts);

  const { user } = useContext(AuthContext);

  // function likePost() {
  //   console.log('Like post');
  // }

  // function commentOnPost() {
  //   console.log('Comment post');
  // }

  /* eslint-disable-next-line */
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const enabled = values.body.length > 0;

  const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
      createPost(body: $body) {
        id
        body
        createdAt
        username
        likes {
          id
          username
          createdAt
        }
        likeCount
        comments {
          id
          body
          username
          createdAt
        }
        commentCount
      }
    }
  `;

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      console.log('result', result);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log('proxyData', data);
      const resultData = result.data.createPost;
      let newData = data.getPosts;
      newData = [resultData, ...newData];
      console.log('newData', newData);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = '';
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <Form.Input
                control="textarea"
                label="Article"
                placeholder="Article"
                name="body"
                onChange={onChange}
                value={values.body}
                error={!!error}
                rows="10"
              />
              <Button type="submit" primary disabled={!enabled}>
                Submit
              </Button>
            </Form.Field>
          </Form>
          {error && (
            <p className="prose text-red-600 text-base mt-2">{error.graphQLErrors[0].message}</p>
          )}
          {loading && <p>Loading...</p>}
        </div>

        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <div key={post.id} className="flex flex-col mb-10 lg:items-start items-center">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                    <Image
                      floated="right"
                      size="mini"
                      src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                      {post.username}
                    </h2>
                    <Link to={`/posts/${post.id}`}>{moment(post.createdAt).fromNow()}</Link>
                    <p className="leading-relaxed text-base">{post.body}</p>
                    <Card.Content extra>
                      <LikeButton user={user} post={post} />
                      <MyPopup
                        content="Comment on post"
                        trigger={
                          <Button labelPosition="right" as={Link} to={`/posts/${post.id}`}>
                            <Button color="blue" basic>
                              <Icon name="comment" />
                            </Button>
                            <Label basic color="blue" pointing="left">
                              {post.commentCount}
                            </Label>
                          </Button>
                        }
                      />
                      {user && user.username === post.username && <DeleteButton postId={post.id} />}
                    </Card.Content>
                  </div>
                </div>
              ))}
          </Transition.Group>
        </div>
      </div>
    </section>
  );
}

PostForm.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.array.isRequired,
    ]),
  ).isRequired,
};
