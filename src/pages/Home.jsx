import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid, Header } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
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

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(data);

  if (loading) return 'กำลังโหลด...';
  if (error) return `ตรวจพบปัญหา! ${error.message}`;

  return (
    <Grid columns={3}>
      <Header as="h1" className="prose lg:prose-xl page-title">
        โพสต์ล่าสุด
      </Header>
      <Grid.Row>
        {data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
}
