// [id].tsx

import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Layout from '../../app/layout';
import styles from '../../styles/post.module.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostPageProps {
  post: Post;
}

const PostPage = ({ post }: PostPageProps) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body.slice(0, 150)} />
      </Head>
      <div className={styles["post-container"]}>
        <h1 className={styles["post-title"]}>{post.title}</h1>
        <p className={styles["post-body"]}>{post.body}</p>
        <p className={styles["post-author"]}>Author: {post.userId}</p>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const { id } = params || {};
  
  // Fetch the post data based on the ID
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/api/posts/${id}`);
  const post: Post = await response.json();

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
