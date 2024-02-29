import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../app/layout';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import { Post } from '../types';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/api/posts`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Head>
        <title>NextJS Blog Demo By Juan Pablo Juliao</title>
        <meta name="description" content="Explore a collection of blog posts on various topics." />
      </Head>
      <div className="container px-5 mx-auto">
        <h1 className="text-2xl py-5">Blog Posts</h1>
        <SearchBar onSearch={handleSearchChange} />
        <div className="post-list">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
