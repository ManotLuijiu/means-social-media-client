import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card, Icon, Label, Button } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/th';
import PropTypes from 'prop-types';

moment().locale('th');

export default function PostCard({ data: { getPosts: posts } }) {
  console.log('PostCardData', posts);

  function likePost() {
    console.log('Like post');
  }

  // function commentOnPost() {
  //   console.log('Comment post');
  // }

  return (
    <>
      <h2 className="prose lg:prose-xl text-center page-title">โพสต์ล่าสุด</h2>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap -m-4">
            {posts &&
              posts.map((post) => (
                <div key={post.id} className="p-4 lg:w-1/2 md:w-full">
                  <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
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
                      <p className="leading-relaxed text-base">{post.body}</p>
                      <Link to={`/posts/${post.id}`}>
                        {moment(post.createdAt).startOf('day').fromNow()}
                      </Link>
                      <Card.Content extra>
                        <Button as="div" labelPosition="right" onClick={likePost}>
                          <Button color="red" basic>
                            <Icon name="heart" />
                          </Button>
                          <Label basic color="red" pointing="left">
                            {post.likeCount}
                          </Label>
                        </Button>
                        <Button labelPosition="right" as={Link} to={`/posts/${post.id}`}>
                          <Button color="blue" basic>
                            <Icon name="comment" />
                          </Button>
                          <Label basic color="blue" pointing="left">
                            {post.commentCount}
                          </Label>
                        </Button>
                      </Card.Content>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

PostCard.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
      PropTypes.array.isRequired,
    ]),
  ).isRequired,
};
