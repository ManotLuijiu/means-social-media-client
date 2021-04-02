import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import FETCH_POSTS_QUERY from '../utils/graphql';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  console.log('data & user', data, user);

  if (loading) return 'กำลังโหลด...';
  if (error) return `ตรวจพบปัญหา! ${error.message}`;

  return <>{user ? <PostForm data={data} /> : <PostCard data={data} />}</>;
}
