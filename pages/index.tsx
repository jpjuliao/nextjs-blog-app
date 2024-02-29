// index.tsx

import Layout from '../app/layout';
import { GetStaticProps } from 'next';
import PostCard from '../components/PostCard';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface HomePageProps {
  posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <Layout>
      <div className="container px-5 mx-auto">
        <h1 className="text-2xl py-5">Blog Posts</h1>
        <div className="post-list">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const appHost = process.env.NEXT_PUBLIC_APP_HOST;
    const apiUrl = `${appHost}/api/posts`;
    const response = await fetch(apiUrl);
    const posts: Post[] = await response.json();

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default HomePage;
