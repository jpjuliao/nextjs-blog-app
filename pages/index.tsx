import { useState, useEffect } from 'react';
import Layout from '../app/layout';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

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
